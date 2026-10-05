import io
import json
import os
import sys
import tempfile
import unittest
from pathlib import Path

TEMP=tempfile.TemporaryDirectory()
os.environ['ZANSHIN_DATA_DIR']=TEMP.name
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from fastapi.testclient import TestClient
from PIL import Image
from app.main import app
from app.db import db
from app.security import hash_password,now

HEADERS={'X-Zanshin-Request':'1','Origin':'http://127.0.0.1:5180'}
PASSWORD='A-test-password-2026!'
class CommerceTests(unittest.TestCase):
    def setUp(self):
        self.client=TestClient(app,headers=HEADERS)
        self.client.__enter__()
        with db() as c:
            for table in ['sessions','orders','reviews','media','contacts','audit','attempts','users']: c.execute('DELETE FROM '+table)
            c.execute('DELETE FROM records')
            seed=json.loads((Path(__file__).resolve().parents[1]/'seed/content.json').read_text(encoding='utf-8'))
            for r in seed:c.execute('INSERT INTO records VALUES(?,?,?,?,?,?)',(r['kind'],r['id'],json.dumps(r['data']),1,r['position'],now()))
            c.execute('INSERT INTO users(id,email,name,password,role,created_at) VALUES(?,?,?,?,?,?)',('admin','admin@example.com','Test Admin',hash_password(PASSWORD),'admin',now()))
    def tearDown(self):self.client.__exit__(None,None,None)
    def login_admin(self):self.assertEqual(self.client.post('/api/auth/login',json={'email':'admin@example.com','password':PASSWORD}).status_code,200)
    def register(self,email='customer@example.com'):
        r=self.client.post('/api/auth/register',json={'name':'Test Customer','email':email,'password':PASSWORD});self.assertEqual(r.status_code,201,r.text);return r.json()
    def order(self,key='test-order-key-123456',qty=2):return self.client.post('/api/orders',headers={'Idempotency-Key':key},json={'items':[{'slug':'focused','quantity':qty}],'address':'123 Test Road, Test City','phone':'9000000000'})
    def test_authentication_role_escalation_and_logout(self):
        self.assertEqual(self.client.get('/api/auth/me').status_code,401)
        self.assertEqual(self.client.post('/api/auth/register',json={'name':'Bad Actor','email':'bad@example.com','password':PASSWORD,'role':'admin'}).status_code,422)
        u=self.register();self.assertEqual(u['role'],'customer');self.assertNotIn('password',u)
        self.assertEqual(self.client.get('/api/admin/customers').status_code,403)
        self.client.post('/api/auth/logout');self.assertEqual(self.client.get('/api/auth/me').status_code,401)
    def test_origin_csrf_and_rate_limit(self):
        self.assertEqual(self.client.post('/api/auth/login',headers={'Origin':'https://untrusted.example'},json={'email':'x@example.com','password':'wrong'}).status_code,403)
        for _ in range(10):self.client.post('/api/auth/login',json={'email':'x@example.com','password':'wrong'})
        self.assertEqual(self.client.post('/api/auth/login',json={'email':'x@example.com','password':'wrong'}).status_code,429)
    def test_order_price_stock_idempotency_ownership(self):
        self.register();r=self.order();self.assertEqual(r.status_code,201,r.text);order=r.json();self.assertEqual(order['subtotal'],3998)
        self.assertEqual(self.order().json()['orderNumber'],order['orderNumber'])
        self.assertEqual(self.client.get('/api/products').json()[0]['stock'],98)
        self.client.post('/api/auth/logout');self.register('other@example.com')
        self.assertEqual(self.client.get('/api/orders/'+order['orderNumber']).status_code,404)
        self.assertEqual(self.client.get('/api/orders').json(),[])
        self.login_admin();cancel=self.client.patch('/api/admin/orders/'+order['orderNumber'],json={'status':'cancelled'});self.assertEqual(cancel.status_code,200)
        self.client.patch('/api/admin/orders/'+order['orderNumber'],json={'status':'cancelled'})
        self.assertEqual(self.client.get('/api/products').json()[0]['stock'],100)
        self.assertEqual(self.client.patch('/api/admin/orders/'+order['orderNumber'],json={'status':'shipped'}).status_code,409)
    def test_insufficient_stock_is_atomic(self):
        self.register()
        with db() as c:
            r=c.execute("SELECT data FROM records WHERE kind='products' AND id='connected'").fetchone();p=json.loads(r['data']);p['stock']=0;c.execute("UPDATE records SET data=? WHERE kind='products' AND id='connected'",(json.dumps(p),))
        r=self.client.post('/api/orders',headers={'Idempotency-Key':'atomic-order-key-1234'},json={'items':[{'slug':'focused','quantity':2},{'slug':'connected','quantity':1}],'address':'123 Test Road, Test City','phone':'9000000000'})
        self.assertEqual(r.status_code,409)
        self.assertEqual(self.client.get('/api/products').json()[0]['stock'],100)
    def test_employee_permissions_and_revocation(self):
        self.login_admin();r=self.client.post('/api/admin/staff',json={'name':'Content Editor','email':'editor@example.com','password':PASSWORD,'permissions':['content']});self.assertEqual(r.status_code,201)
        staff_id=r.json()['id'];self.client.post('/api/auth/login',json={'email':'editor@example.com','password':PASSWORD})
        self.assertEqual(self.client.get('/api/admin/content/hero').status_code,200)
        for path in ['/api/admin/customers','/api/admin/staff','/api/admin/orders']:self.assertEqual(self.client.get(path).status_code,403)
        cookie=self.client.cookies.get('zanshin_session');self.login_admin();self.client.patch('/api/admin/staff/'+staff_id,json={'active':False,'permissions':[]})
        outsider=TestClient(app,headers=HEADERS);outsider.cookies.set('zanshin_session',cookie)
        self.assertEqual(outsider.get('/api/auth/me').status_code,401)
    def test_content_publish_order_media_validation(self):
        self.login_admin();r=self.client.get('/api/admin/content/hero').json()[0]
        for k in ['id','updatedAt']:r.pop(k)
        r.update(title='A new brand story',published=False,position=99)
        self.assertEqual(self.client.put('/api/admin/content/hero/focused',json=r).status_code,200)
        self.assertEqual(len(self.client.get('/api/content').json()['hero']),3)
        r['published']=True;self.client.put('/api/admin/content/hero/focused',json=r)
        self.assertEqual(self.client.get('/api/content').json()['hero'][-1]['title'],'A new brand story')
        r['image']='javascript:alert(1)';self.assertEqual(self.client.put('/api/admin/content/hero/focused',json=r).status_code,422)
    def test_customer_review_media_moderation_and_isolation(self):
        self.register();buff=io.BytesIO();Image.new('RGB',(8,8),'green').save(buff,'PNG')
        upload=self.client.post('/api/media',files={'file':('image.png',buff.getvalue(),'image/png')});self.assertEqual(upload.status_code,201,upload.text)
        media=upload.json()['url'];payload={'productSlug':'focused','title':'A personal ritual','body':'A fragrance moment that I enjoy.','rating':5,'media':media,'consent':True}
        review=self.client.post('/api/reviews',json=payload);self.assertEqual(review.status_code,201)
        self.assertEqual(self.client.get('/api/reviews').json(),[])
        self.client.post('/api/auth/logout');self.assertEqual(self.client.get(media).status_code,401)
        self.register('second@example.com');self.assertEqual(self.client.post('/api/reviews',json=payload).status_code,400)
        self.login_admin();self.client.patch('/api/admin/reviews/'+review.json()['id'],json={'status':'approved'})
        self.client.post('/api/auth/logout');self.assertEqual(self.client.get(media).status_code,200);self.assertEqual(len(self.client.get('/api/reviews').json()),1)
    def test_upload_rejects_executable_and_spoofed_image(self):
        self.register()
        for name,mime in [('evil.svg','image/svg+xml'),('fake.png','image/png')]:self.assertEqual(self.client.post('/api/media',files={'file':(name,b'<script>alert(1)</script>',mime)}).status_code,400)
    def test_contact_dashboard_and_quiz(self):
        result=self.client.post('/api/contact',json={'name':'Test Enquiry','email':'test@example.com','message':'Please tell me more about gifting.'});self.assertEqual(result.status_code,201,result.text)
        cat=self.client.get('/api/recommendations/categories').json()[0]
        self.assertEqual(self.client.get('/api/recommendations',params={'category':cat['category'],'moment':cat['moments'][0]}).status_code,200)
        self.login_admin();self.assertEqual(self.client.get('/api/admin/dashboard').json()['newEnquiries'],1)
        self.assertEqual(len(self.client.get('/api/admin/contacts').json()),1)
    def test_profile_password_and_session_invalidation(self):
        self.register();old=self.client.cookies.get('zanshin_session')
        self.assertEqual(self.client.put('/api/auth/profile',json={'name':'Updated Customer','phone':'1234567890','address':'New address'}).json()['name'],'Updated Customer')
        self.assertEqual(self.client.post('/api/auth/password',json={'currentPassword':PASSWORD,'password':'A-new-secure-password!'}).status_code,200)
        other=TestClient(app,headers=HEADERS);other.cookies.set('zanshin_session',old);self.assertEqual(other.get('/api/auth/me').status_code,401)

if __name__=='__main__':unittest.main()
