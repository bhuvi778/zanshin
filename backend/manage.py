"""Local-only admin bootstrap and password recovery. Never creates a default password."""
import argparse
import getpass
import secrets
from pathlib import Path
from app.db import init, db
from app.security import uid, now, hash_password
from app.main import Register

parser=argparse.ArgumentParser()
parser.add_argument('command',choices=['create-admin','reset-password'])
parser.add_argument('--email',required=True)
parser.add_argument('--name',default='Zanshin Administrator')
parser.add_argument('--generate-local',action='store_true',help='Write a generated password to an ignored local file')
args=parser.parse_args()
password=secrets.token_urlsafe(24) if args.generate_local else getpass.getpass('Password (at least 12 characters): ')
details=Register(email=args.email,name=args.name,password=password)
init()
with db() as c:
    row=c.execute('SELECT id FROM users WHERE email=?',(details.email,)).fetchone()
    if args.command=='create-admin':
        if row: raise SystemExit('Account already exists. Use reset-password for recovery.')
        c.execute('INSERT INTO users(id,email,name,password,role,created_at) VALUES(?,?,?,?,?,?)',(uid(),details.email,details.name,hash_password(password),'admin',now()))
    else:
        if not row: raise SystemExit('Account not found.')
        c.execute('UPDATE users SET password=? WHERE id=?',(hash_password(password),row['id']))
        c.execute('DELETE FROM sessions WHERE user_id=?',(row['id'],))
if args.generate_local:
    path=Path(__file__).parent/'.local-admin.txt'
    path.write_text('Local Zanshin administrator\nEmail: '+details.email+'\nPassword: '+password+'\n\nSign in at http://127.0.0.1:5180/admin/login\nChange this password in Account > Security after signing in.\nDo not share or commit this file.\n',encoding='utf-8')
    print('Account ready. Credentials saved to backend/.local-admin.txt (Git ignored).')
else: print('Account updated.')
