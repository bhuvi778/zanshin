import hashlib
import hmac
import json
import secrets
import time
from datetime import datetime, timezone
from fastapi import HTTPException, Request
from .db import db

MODULES = ['dashboard','content','products','orders','customers','community','journal','contacts','reviews']
def now(): return datetime.now(timezone.utc).isoformat()
def uid(): return secrets.token_hex(12)
def digest(s): return hashlib.sha256(s.encode()).hexdigest()
def hash_password(password):
    salt = secrets.token_bytes(16)
    value = hashlib.scrypt(password.encode(),salt=salt,n=16384,r=8,p=1)
    return salt.hex()+':'+value.hex()
def verify(password, encoded):
    salt, value = encoded.split(':')
    return hmac.compare_digest(hashlib.scrypt(password.encode(),salt=bytes.fromhex(salt),n=16384,r=8,p=1).hex(),value)
def public_user(row):
    return {'id':row['id'],'email':row['email'],'name':row['name'],'role':row['role'],'active':bool(row['active']),'permissions':json.loads(row['permissions']),'profile':json.loads(row['profile']),'createdAt':row['created_at'],'lastLogin':row['last_login']}
def current_user(request:Request):
    token=request.cookies.get('zanshin_session','')
    with db() as c:
        row=c.execute('SELECT u.* FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token=? AND s.expires>? AND u.active=1',(digest(token),time.time())).fetchone()
    if not row: raise HTTPException(401,'Please sign in to continue.')
    return public_user(row)
def staff(request, module):
    u=current_user(request)
    if u['role']!='admin' and (u['role']!='employee' or module not in u['permissions']):
        raise HTTPException(403,'You do not have access to this area.')
    return u
def admin(request):
    u=current_user(request)
    if u['role']!='admin': raise HTTPException(403,'Administrator access required.')
    return u
def throttle(bucket, limit=10, seconds=900):
    with db() as c:
        c.execute('DELETE FROM attempts WHERE expires<?',(time.time(),))
        c.execute('INSERT INTO attempts VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET count=count+1',(bucket,time.time()+seconds))
        row=c.execute('SELECT count FROM attempts WHERE bucket=?',(bucket,)).fetchone()
    if row['count']>limit: raise HTTPException(429,'Too many attempts. Please try again later.')
def audit(c, user, action, target):
    c.execute('INSERT INTO audit(user_id,action,target,created_at) VALUES(?,?,?,?)',(user['id'],action,target,now()))
