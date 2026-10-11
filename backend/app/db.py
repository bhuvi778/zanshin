"""Single-instance persistent store. Back up the database and media together."""
import json
import os
import sqlite3
from contextlib import contextmanager
from pathlib import Path

BASE = Path(__file__).resolve().parents[1]
DATA = Path(os.environ.get('ZANSHIN_DATA_DIR', BASE / 'data'))

@contextmanager
def db():
    DATA.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(DATA / 'zanshin.sqlite3', timeout=15)
    con.row_factory = sqlite3.Row
    con.execute('PRAGMA foreign_keys=ON')
    try:
        yield con
        con.commit()
    except Exception:
        con.rollback()
        raise
    finally:
        con.close()

def init():
    with db() as c:
        c.executescript('''
        PRAGMA journal_mode=WAL;
        CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,name TEXT NOT NULL,password TEXT NOT NULL,role TEXT NOT NULL,permissions TEXT NOT NULL DEFAULT '[]',active INTEGER NOT NULL DEFAULT 1,profile TEXT NOT NULL DEFAULT '{}',created_at TEXT NOT NULL,last_login TEXT);
        CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),expires REAL NOT NULL);
        CREATE TABLE IF NOT EXISTS records(kind TEXT NOT NULL,id TEXT NOT NULL,data TEXT NOT NULL,published INTEGER NOT NULL DEFAULT 0,position INTEGER NOT NULL DEFAULT 0,updated_at TEXT NOT NULL,PRIMARY KEY(kind,id));
        CREATE TABLE IF NOT EXISTS orders(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),data TEXT NOT NULL,request_key TEXT NOT NULL,created_at TEXT NOT NULL,UNIQUE(user_id,request_key));
        CREATE TABLE IF NOT EXISTS reviews(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),data TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'pending',created_at TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS contacts(id TEXT PRIMARY KEY,data TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'new',created_at TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS media(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),mime TEXT NOT NULL,public INTEGER NOT NULL DEFAULT 0,created_at TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS audit(id INTEGER PRIMARY KEY,user_id TEXT,action TEXT NOT NULL,target TEXT NOT NULL,created_at TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS attempts(bucket TEXT PRIMARY KEY,count INTEGER NOT NULL,expires REAL NOT NULL);
        CREATE TABLE IF NOT EXISTS schema_meta(version INTEGER PRIMARY KEY);
        INSERT OR IGNORE INTO schema_meta VALUES(1);
        ''')
        # Seed only an empty content store; never overwrite admin edits on restart.
        if not c.execute('SELECT 1 FROM records LIMIT 1').fetchone():
            for r in json.loads((BASE / 'seed/content.json').read_text(encoding='utf-8')):
                c.execute('INSERT INTO records VALUES(?,?,?,?,?,?)', (r['kind'],r['id'],json.dumps(r['data']),r.get('published',True),r.get('position',0),'2026-10-05T00:00:00+00:00'))


        if not c.execute('SELECT 1 FROM schema_meta WHERE version=2').fetchone():
            for row in c.execute("SELECT id,data FROM records WHERE kind='products'").fetchall():
                data = json.loads(row['data'])
                if data.get('size') in ('50 ml / 1.7 fl oz', '50 ml'):
                    data['size'] = '51 ml'
                    c.execute("UPDATE records SET data=? WHERE kind='products' AND id=?", (json.dumps(data), row['id']))
            c.execute('INSERT INTO schema_meta VALUES(2)')

def record(row):
    return {**json.loads(row['data']),'id':row['id'],'published':bool(row['published']),'position':row['position'],'updatedAt':row['updated_at']}
