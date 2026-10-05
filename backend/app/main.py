import io
import json
import os
import re
import secrets
import time
from contextlib import asynccontextmanager
from typing import Literal
from fastapi import FastAPI, HTTPException, Request, Response, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel, ConfigDict, Field, field_validator
from PIL import Image, UnidentifiedImageError
from .db import BASE, DATA, db, init, record
from .security import MODULES, now, uid, digest, hash_password, verify, public_user, current_user, staff, admin, throttle, audit

ORIGINS = [s.strip() for s in os.getenv('CORS_ORIGINS','http://localhost:5173,http://127.0.0.1:5173,http://localhost:5180,http://127.0.0.1:5180').split(',') if s.strip()]
SECURE = os.getenv('COOKIE_SECURE','false').lower() == 'true'
@asynccontextmanager
async def lifespan(app):
    init()
    (DATA/'media').mkdir(parents=True,exist_ok=True)
    yield
app=FastAPI(title='Zanshin Commerce API',version='1.0.0',lifespan=lifespan)
app.add_middleware(CORSMiddleware,allow_origins=ORIGINS,allow_credentials=True,allow_methods=['GET','POST','PUT','PATCH','DELETE'],allow_headers=['Content-Type','X-Zanshin-Request','Idempotency-Key'])

@app.middleware('http')
async def request_guard(request, call_next):
    if request.method not in ('GET','HEAD','OPTIONS'):
        origin=request.headers.get('origin')
        if (origin and origin not in ORIGINS) or request.headers.get('x-zanshin-request')!='1':
            return JSONResponse({'message':'Request origin could not be verified.'},status_code=403)
        try: size=int(request.headers.get('content-length','0'))
        except ValueError: return JSONResponse({'message':'Invalid request length'},status_code=400)
        if size>66*1024*1024: return JSONResponse({'message':'Maximum request size is 64 MB.'},status_code=413)
    response=await call_next(request)
    response.headers['X-Content-Type-Options']='nosniff'
    response.headers['Cache-Control']='no-store'
    return response

@app.exception_handler(HTTPException)
async def http_error(request, exc): return JSONResponse({'message':exc.detail},status_code=exc.status_code)
@app.exception_handler(RequestValidationError)
async def validation_error(request, exc):
    return JSONResponse({'message':'Please check the form fields.','issues':[{'field':'.'.join(str(x) for x in e['loc']),'message':e['msg']} for e in exc.errors()]},status_code=422)

class Form(BaseModel):
    model_config=ConfigDict(extra='forbid',str_strip_whitespace=True)
class Login(Form):
    email:str=Field(max_length=160)
    password:str=Field(min_length=1,max_length=128)
    @field_validator('email')
    @classmethod
    def email_valid(cls,v):
        if not re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+',v): raise ValueError('Enter a valid email')
        return v.lower()
class Register(Login):
    name:str=Field(min_length=2,max_length=100)
    password:str=Field(min_length=12,max_length=128)
class Profile(Form):
    name:str=Field(min_length=2,max_length=100)
    phone:str=Field(default='',max_length=30)
    address:str=Field(default='',max_length=500)
class Password(Form):
    currentPassword:str=Field(min_length=1,max_length=128)
    password:str=Field(min_length=12,max_length=128)
class Employee(Register):
    permissions:list[Literal['dashboard','content','products','orders','customers','community','journal','contacts','reviews']]=Field(default_factory=list)
class StaffUpdate(Form):
    active:bool
    permissions:list[Literal['dashboard','content','products','orders','customers','community','journal','contacts','reviews']]
class Contact(Form):
    name:str=Field(min_length=2,max_length=120)
    email:str=Field(max_length=160)
    message:str=Field(min_length=10,max_length=5000)
    _email=field_validator('email')(Login.email_valid.__func__)
class Item(Form):
    slug:str=Field(pattern=r'^[a-z0-9-]+$',max_length=80)
    quantity:int=Field(ge=1,le=20,strict=True)
class OrderInput(Form):
    items:list[Item]=Field(min_length=1,max_length=20)
    address:str=Field(min_length=10,max_length=500)
    phone:str=Field(min_length=7,max_length=30)
class Status(Form):
    status:Literal['placed','confirmed','processing','shipped','delivered','cancelled']
    tracking:str=Field(default='',max_length=200)
class Review(Form):
    productSlug:str=Field(pattern=r'^(focused|energised|connected|magnetized)$')
    title:str=Field(min_length=3,max_length=100)
    body:str=Field(min_length=10,max_length=2000)
    rating:int=Field(ge=1,le=5,strict=True)
    media:str=Field(default='',max_length=500)
    mediaType:Literal['image','video']='image'
    consent:Literal[True]
class Moderation(Form):
    status:Literal['approved','rejected','pending']
class ContactStatus(Form):
    status:Literal['new','read','resolved']

def media_url(value):
    if not value: return value
    if not (re.match(r'^https://[^\s]+$',value) or re.match(r'^/(assets|films|api/media)/[^\s]+$',value)):
        raise ValueError('Use an HTTPS URL or a local asset/media path')
    return value
class Content(Form):
    title:str=Field(min_length=1,max_length=160)
    label:str=Field(default='',max_length=200)
    body:str=Field(default='',max_length=20000)
    image:str=Field(default='',max_length=1000)
    video:str=Field(default='',max_length=1000)
    mediaType:Literal['image','video']='image'
    productSlug:Literal['focused','energised','connected','magnetized']='focused'
    duration:int=Field(default=5000,ge=2000,le=30000)
    color:str=Field(default='#58674c',pattern=r'^#[0-9a-fA-F]{6}$')
    published:bool=False
    position:int=Field(default=0,ge=0,le=10000)
    _urls=field_validator('image','video')(lambda v:media_url(v))
class ProductInput(Form):
    slug:Literal['focused','energised','connected','magnetized']
    name:str=Field(min_length=1,max_length=100)
    descriptor:str=Field(min_length=1,max_length=250)
    mood:str=Field(min_length=1,max_length=300)
    story:str=Field(min_length=1,max_length=5000)
    moments:list[str]=Field(min_length=1,max_length=20)
    color:str=Field(pattern=r'^#[0-9a-fA-F]{6}$')
    scene:str=Field(max_length=1000)
    label:str=Field(max_length=1000)
    lifestyle:str=Field(max_length=1000)
    image:str=Field(default='',max_length=1000)
    size:str=Field(min_length=1,max_length=80)
    price:int=Field(ge=0,le=1000000,strict=True)
    stock:int=Field(default=100,ge=0,le=1000000,strict=True)
    published:bool=True
    position:int=Field(default=0,ge=0,le=10000)
    @field_validator('image','scene','label','lifestyle')
    @classmethod
    def safe_asset(cls,v):
        if v and not v.startswith(('/', 'https://')):
            if not re.fullmatch(r'[a-zA-Z0-9_./-]+',v) or '..' in v: raise ValueError('Invalid asset')
            return v
        return media_url(v)

KINDS={'hero':'content','moments':'content','circle':'content','creators':'content','products':'products','community':'community','journal':'journal'}
def kind_permission(kind):
    if kind not in KINDS: raise HTTPException(404,'Unknown content area')
    return KINDS[kind]
def rows(kind, published=False):
    with db() as c:
        result=c.execute('SELECT * FROM records WHERE kind=?'+(' AND published=1' if published else '')+' ORDER BY position,id',(kind,)).fetchall()
    return [record(r) for r in result]
def session(response, user_id):
    token=secrets.token_urlsafe(40)
    with db() as c:
        c.execute('DELETE FROM sessions WHERE expires<?',(time.time(),))
        c.execute('INSERT INTO sessions VALUES(?,?,?)',(digest(token),user_id,time.time()+86400))
        c.execute('UPDATE users SET last_login=? WHERE id=?',(now(),user_id))
    response.set_cookie('zanshin_session',token,httponly=True,secure=SECURE,samesite='lax',max_age=86400,path='/api')

@app.get('/api/health')
def health(): return {'status':'ok','service':'zanshin-fastapi'}
@app.post('/api/auth/register',status_code=201)
def register(payload:Register,request:Request,response:Response):
    throttle('register:'+request.client.host,5)
    with db() as c:
        if c.execute('SELECT 1 FROM users WHERE email=?',(payload.email,)).fetchone(): raise HTTPException(409,'This email is already registered. Sign in instead.')
        id=uid()
        c.execute('INSERT INTO users(id,email,name,password,role,created_at) VALUES(?,?,?,?,?,?)',(id,payload.email,payload.name,hash_password(payload.password),'customer',now()))
        row=c.execute('SELECT * FROM users WHERE id=?',(id,)).fetchone()
    session(response,id)
    return public_user(row)
@app.post('/api/auth/login')
def login(payload:Login,request:Request,response:Response):
    throttle('login-ip:'+request.client.host,50)
    throttle('login-email:'+payload.email,10)
    with db() as c: row=c.execute('SELECT * FROM users WHERE email=?',(payload.email,)).fetchone()
    if not row or not row['active'] or not verify(payload.password,row['password']): raise HTTPException(401,'Email or password is incorrect.')
    session(response,row['id'])
    return public_user(row)
@app.get('/api/auth/me')
def me(request:Request): return current_user(request)
@app.post('/api/auth/logout')
def logout(request:Request,response:Response):
    with db() as c: c.execute('DELETE FROM sessions WHERE token=?',(digest(request.cookies.get('zanshin_session','')),))
    response.delete_cookie('zanshin_session',path='/api')
    return {'ok':True}
@app.put('/api/auth/profile')
def profile(payload:Profile,request:Request):
    u=current_user(request)
    with db() as c:
        c.execute('UPDATE users SET name=?,profile=? WHERE id=?',(payload.name,json.dumps(payload.model_dump(exclude={'name'})),u['id']))
        return public_user(c.execute('SELECT * FROM users WHERE id=?',(u['id'],)).fetchone())
@app.post('/api/auth/password')
def password(payload:Password,request:Request,response:Response):
    u=current_user(request)
    throttle('password:'+u['id'],8)
    with db() as c:
        row=c.execute('SELECT password FROM users WHERE id=?',(u['id'],)).fetchone()
        if not verify(payload.currentPassword,row['password']): raise HTTPException(400,'Current password is incorrect.')
        c.execute('UPDATE users SET password=? WHERE id=?',(hash_password(payload.password),u['id']))
        c.execute('DELETE FROM sessions WHERE user_id=?',(u['id'],))
    session(response,u['id'])
    return {'ok':True}
@app.get('/api/products')
def products(): return rows('products',True)
@app.get('/api/content')
def content(): return {k:rows(k,True) for k in KINDS if k!='products'}
@app.get('/api/recommendations/categories')
def categories():
    data=json.loads((BASE/'seed/recommendations.json').read_text(encoding='utf-8'))
    return [{'category':cat,'moments':sorted({r['moment'] for r in data if r['category']==cat})} for cat in sorted({r['category'] for r in data})]
@app.get('/api/recommendations')
def recommendation(category:str,moment:str):
    data=json.loads((BASE/'seed/recommendations.json').read_text(encoding='utf-8'))
    match=next((r for r in data if r['category']==category and r['moment']==moment),None)
    product=next((p for p in products() if match and p['slug']==match['productSlug']),None)
    if not product: raise HTTPException(404,'No available fragrance matches this moment.')
    return {'category':category,'moment':moment,'product':product}
@app.post('/api/contact',status_code=201)
def contact(payload:Contact,request:Request):
    throttle('contact:'+request.client.host,10)
    id='ENQ-'+uid()[:10].upper()
    with db() as c: c.execute('INSERT INTO contacts VALUES(?,?,?,?)',(id,payload.model_dump_json(),'new',now()))
    return {'reference':id}

@app.post('/api/orders',status_code=201)
def create_order(payload:OrderInput,request:Request):
    u=current_user(request)
    key=request.headers.get('idempotency-key','')
    if not re.fullmatch(r'[a-zA-Z0-9-]{16,80}',key): raise HTTPException(400,'A valid order request key is required.')
    with db() as c:
        c.execute('BEGIN IMMEDIATE')
        old=c.execute('SELECT data FROM orders WHERE user_id=? AND request_key=?',(u['id'],key)).fetchone()
        if old: return json.loads(old['data'])
        quantities={}
        for item in payload.items: quantities[item.slug]=quantities.get(item.slug,0)+item.quantity
        items=[]
        for slug,qty in quantities.items():
            row=c.execute("SELECT * FROM records WHERE kind='products' AND id=? AND published=1",(slug,)).fetchone()
            if not row or qty>20: raise HTTPException(400,'A selected fragrance or quantity is unavailable.')
            p=json.loads(row['data'])
            if p['stock']<qty: raise HTTPException(409,p['name']+' does not have enough stock.')
            items.append({'slug':slug,'name':p['name'],'quantity':qty,'unitPrice':p['price']})
            p['stock']-=qty
            c.execute("UPDATE records SET data=? WHERE kind='products' AND id=?",(json.dumps(p),slug))
        id='ZAN-'+uid()[:12].upper()
        order={'orderNumber':id,'customer':{'id':u['id'],'name':u['name'],'email':u['email']},'items':items,'subtotal':sum(i['quantity']*i['unitPrice'] for i in items),'status':'placed','paymentStatus':'unpaid','address':payload.address,'phone':payload.phone,'tracking':'','createdAt':now()}
        c.execute('INSERT INTO orders VALUES(?,?,?,?,?)',(id,u['id'],json.dumps(order),key,order['createdAt']))
    return order
@app.get('/api/orders')
def my_orders(request:Request):
    u=current_user(request)
    with db() as c: return [json.loads(r['data']) for r in c.execute('SELECT data FROM orders WHERE user_id=? ORDER BY created_at DESC',(u['id'],))]
@app.get('/api/orders/{id}')
def order_detail(id:str,request:Request):
    u=current_user(request)
    with db() as c: row=c.execute('SELECT data FROM orders WHERE id=? AND user_id=?',(id,u['id'])).fetchone()
    if not row: raise HTTPException(404,'Order not found in your account.')
    return json.loads(row['data'])
@app.get('/api/reviews')
def reviews():
    with db() as c:
        return [{**json.loads(r['data']),'id':r['id'],'name':r['name'],'createdAt':r['created_at']} for r in c.execute("SELECT r.*,u.name FROM reviews r JOIN users u ON r.user_id=u.id WHERE r.status='approved' ORDER BY r.created_at DESC LIMIT 100")]
@app.get('/api/me/reviews')
def my_reviews(request:Request):
    u=current_user(request)
    with db() as c: return [{**json.loads(r['data']),'id':r['id'],'status':r['status']} for r in c.execute('SELECT * FROM reviews WHERE user_id=? ORDER BY created_at DESC',(u['id'],))]
@app.post('/api/reviews',status_code=201)
def review(payload:Review,request:Request):
    u=current_user(request); throttle('review:'+u['id'],10,3600)
    if u['role']!='customer': raise HTTPException(403,'Customer accounts can submit reviews.')
    with db() as c:
        if payload.media:
            if not payload.media.startswith('/api/media/'): raise HTTPException(400,'Upload your own review media first.')
            m=c.execute('SELECT * FROM media WHERE id=? AND user_id=?',(payload.media.split('/')[-1],u['id'])).fetchone()
            if not m: raise HTTPException(400,'Review media does not belong to your account.')
            if not m['mime'].startswith(payload.mediaType+'/'): raise HTTPException(400,'Media type does not match the upload.')
        id=uid(); c.execute('INSERT INTO reviews VALUES(?,?,?,?,?)',(id,u['id'],payload.model_dump_json(),'pending',now()))
    return {'id':id,'status':'pending'}

@app.get('/api/admin/dashboard')
def dashboard(request:Request):
    staff(request,'dashboard')
    with db() as c:
        orders=[json.loads(r['data']) for r in c.execute('SELECT data FROM orders ORDER BY created_at DESC')]
        by_product={}
        for o in orders:
            if o['status']=='cancelled': continue
            for item in o['items']: by_product[item['name']]=by_product.get(item['name'],0)+item['quantity']
        return {'orders':len(orders),'orderValue':sum(o['subtotal'] for o in orders if o['status']!='cancelled'),'customers':c.execute("SELECT COUNT(*) FROM users WHERE role='customer'").fetchone()[0],'pendingReviews':c.execute("SELECT COUNT(*) FROM reviews WHERE status='pending'").fetchone()[0],'newEnquiries':c.execute("SELECT COUNT(*) FROM contacts WHERE status='new'").fetchone()[0],'byProduct':by_product,'recentOrders':orders[:8]}
@app.get('/api/admin/content/{kind}')
def admin_content(kind:str,request:Request):
    staff(request,kind_permission(kind)); return rows(kind)
@app.put('/api/admin/content/{kind}/{id}')
def save_content(kind:str,id:str,payload:dict,request:Request):
    u=staff(request,kind_permission(kind))
    if not re.fullmatch(r'[a-z0-9-]{1,80}',id): raise HTTPException(400,'Use a short lowercase identifier.')
    try: parsed=(ProductInput if kind=='products' else Content).model_validate(payload)
    except Exception as exc:
        if hasattr(exc,'errors'): raise HTTPException(422,'Check required fields, media paths and numeric limits.')
        raise
    data=parsed.model_dump(); published=data.pop('published'); position=data.pop('position')
    if kind=='products' and data['slug']!=id: raise HTTPException(400,'Product identifier cannot change.')
    if kind in ['hero','moments','circle','creators'] and not data.get('image'): raise HTTPException(422,'An image or video poster is required.')
    if kind=='hero' and data['mediaType']=='video' and not data['video']: raise HTTPException(422,'Choose a video for this slide.')
    with db() as c:
        c.execute('INSERT INTO records VALUES(?,?,?,?,?,?) ON CONFLICT(kind,id) DO UPDATE SET data=excluded.data,published=excluded.published,position=excluded.position,updated_at=excluded.updated_at',(kind,id,json.dumps(data),published,position,now()))
        audit(c,u,'save-content',kind+'/'+id)
    return {'id':id,**parsed.model_dump()}
@app.delete('/api/admin/content/{kind}/{id}')
def delete_content(kind:str,id:str,request:Request):
    u=staff(request,kind_permission(kind))
    if kind=='products': raise HTTPException(400,'Unpublish a product instead of deleting its history.')
    with db() as c:
        c.execute('DELETE FROM records WHERE kind=? AND id=?',(kind,id)); audit(c,u,'delete-content',kind+'/'+id)
    return {'ok':True}
@app.get('/api/admin/customers')
def customers(request:Request):
    staff(request,'customers')
    with db() as c:
        result=[]
        for row in c.execute("SELECT * FROM users WHERE role='customer' ORDER BY created_at DESC"):
            orders=[json.loads(r['data']) for r in c.execute('SELECT data FROM orders WHERE user_id=? ORDER BY created_at DESC',(row['id'],))]
            result.append({**public_user(row),'orders':orders,'orderCount':len(orders),'orderValue':sum(o['subtotal'] for o in orders if o['status']!='cancelled')})
        return result
@app.get('/api/admin/orders')
def all_orders(request:Request):
    staff(request,'orders')
    with db() as c: return [json.loads(r['data']) for r in c.execute('SELECT data FROM orders ORDER BY created_at DESC')]
@app.patch('/api/admin/orders/{id}')
def update_order(id:str,payload:Status,request:Request):
    u=staff(request,'orders')
    allowed={'placed':['confirmed','cancelled'],'confirmed':['processing','cancelled'],'processing':['shipped','cancelled'],'shipped':['delivered'],'delivered':[],'cancelled':[]}
    with db() as c:
        c.execute('BEGIN IMMEDIATE')
        r=c.execute('SELECT data FROM orders WHERE id=?',(id,)).fetchone()
        if not r: raise HTTPException(404,'Order not found')
        o=json.loads(r['data'])
        if payload.status!=o['status'] and payload.status not in allowed[o['status']]: raise HTTPException(409,'This order status transition is not allowed.')
        if payload.status=='cancelled' and o['status']!='cancelled':
            for item in o['items']:
                row=c.execute("SELECT data FROM records WHERE kind='products' AND id=?",(item['slug'],)).fetchone()
                if row:
                    p=json.loads(row['data']);p['stock']+=item['quantity'];c.execute("UPDATE records SET data=? WHERE kind='products' AND id=?",(json.dumps(p),item['slug']))
        o.update(payload.model_dump());c.execute('UPDATE orders SET data=? WHERE id=?',(json.dumps(o),id));audit(c,u,'update-order',id)
    return o
@app.get('/api/admin/contacts')
def contacts(request:Request):
    staff(request,'contacts')
    with db() as c: return [{**json.loads(r['data']),'id':r['id'],'status':r['status'],'createdAt':r['created_at']} for r in c.execute('SELECT * FROM contacts ORDER BY created_at DESC')]
@app.patch('/api/admin/contacts/{id}')
def update_contact(id:str,payload:ContactStatus,request:Request):
    u=staff(request,'contacts')
    with db() as c: c.execute('UPDATE contacts SET status=? WHERE id=?',(payload.status,id));audit(c,u,'update-contact',id)
    return {'ok':True}
@app.get('/api/admin/reviews')
def admin_reviews(request:Request):
    staff(request,'reviews')
    with db() as c: return [{**json.loads(r['data']),'id':r['id'],'name':r['name'],'status':r['status'],'createdAt':r['created_at']} for r in c.execute('SELECT r.*,u.name FROM reviews r JOIN users u ON r.user_id=u.id ORDER BY r.created_at DESC')]
@app.patch('/api/admin/reviews/{id}')
def moderate(id:str,payload:Moderation,request:Request):
    u=staff(request,'reviews')
    with db() as c: c.execute('UPDATE reviews SET status=? WHERE id=?',(payload.status,id));audit(c,u,'moderate-review',id)
    return {'ok':True}
@app.get('/api/admin/staff')
def employees(request:Request):
    admin(request)
    with db() as c: return [public_user(r) for r in c.execute("SELECT * FROM users WHERE role!='customer' ORDER BY created_at")]
@app.post('/api/admin/staff',status_code=201)
def create_employee(payload:Employee,request:Request):
    u=admin(request)
    with db() as c:
        if c.execute('SELECT 1 FROM users WHERE email=?',(payload.email,)).fetchone(): raise HTTPException(409,'Email already exists.')
        id=uid();c.execute('INSERT INTO users(id,email,name,password,role,permissions,created_at) VALUES(?,?,?,?,?,?,?)',(id,payload.email,payload.name,hash_password(payload.password),'employee',json.dumps(payload.permissions),now()));audit(c,u,'create-employee',id)
    return {'id':id}
@app.patch('/api/admin/staff/{id}')
def update_employee(id:str,payload:StaffUpdate,request:Request):
    u=admin(request)
    with db() as c:
        row=c.execute('SELECT role FROM users WHERE id=?',(id,)).fetchone()
        if not row or row['role']!='employee': raise HTTPException(400,'Only employee access can be changed here.')
        c.execute('UPDATE users SET active=?,permissions=? WHERE id=?',(payload.active,json.dumps(payload.permissions),id))
        c.execute('DELETE FROM sessions WHERE user_id=?',(id,));audit(c,u,'update-employee',id)
    return {'ok':True}
@app.get('/api/admin/audit')
def audit_log(request:Request):
    admin(request)
    with db() as c: return [dict(r) for r in c.execute('SELECT a.*,u.name FROM audit a LEFT JOIN users u ON a.user_id=u.id ORDER BY a.id DESC LIMIT 200')]

@app.post('/api/media',status_code=201)
async def upload(request:Request,file:UploadFile=File(...)):
    u=current_user(request);throttle('upload:'+u['id'],30,3600)
    if u['role']=='employee' and not set(u['permissions']).intersection({'content','products','community','journal'}): raise HTTPException(403,'Media editing permission required.')
    buffer=bytearray()
    while chunk:=await file.read(1024*1024):
        buffer.extend(chunk)
        if len(buffer)>64*1024*1024: raise HTTPException(413,'Use a file smaller than 64 MB.')
    raw=bytes(buffer);mime=file.content_type
    if mime in ('image/jpeg','image/png','image/webp'):
        try:
            image=Image.open(io.BytesIO(raw));image.verify()
            image=Image.open(io.BytesIO(raw));image.thumbnail((3000,3000));out=io.BytesIO();image.convert('RGB').save(out,'WEBP',quality=88);raw=out.getvalue();ext='.webp';mime='image/webp'
        except (UnidentifiedImageError,ValueError,OSError,Image.DecompressionBombError): raise HTTPException(400,'Invalid image file.')
    elif mime=='video/mp4' and raw[4:8]==b'ftyp': ext='.mp4'
    elif mime=='video/webm' and raw[:4]==b'\x1aE\xdf\xa3': ext='.webm'
    else: raise HTTPException(400,'Upload a JPG, PNG, WebP, MP4 or WebM file.')
    id=uid()+ext;(DATA/'media').mkdir(parents=True,exist_ok=True);(DATA/'media'/id).write_bytes(raw)
    with db() as c: c.execute('INSERT INTO media VALUES(?,?,?,?,?)',(id,u['id'],mime,u['role']!='customer',now()))
    return {'url':'/api/media/'+id,'type':'video' if mime.startswith('video') else 'image'}
@app.get('/api/media/{id}')
def get_media(id:str,request:Request):
    with db() as c:
        row=c.execute('SELECT * FROM media WHERE id=?',(id,)).fetchone()
        if not row: raise HTTPException(404,'Media not found')
        approved=any(json.loads(r['data']).get('media')=='/api/media/'+id for r in c.execute("SELECT data FROM reviews WHERE status='approved'"))
    if not row['public'] and not approved:
        u=current_user(request)
        if u['id']!=row['user_id'] and not (u['role']=='admin' or 'reviews' in u['permissions']): raise HTTPException(403,'Private review media')
    return FileResponse(DATA/'media'/id,media_type=row['mime'])
