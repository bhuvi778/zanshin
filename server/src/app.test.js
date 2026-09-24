import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import {connectDatabase} from './db.js';
import {seed} from './seed.js';
import {createApp} from './app.js';

test('catalog, recommendation, contact and demo order flow',async t=>{
 process.env.NODE_ENV='test';
 await connectDatabase(process.env.TEST_MONGO_URI||'mongodb://127.0.0.1:27017/zanshin_test');
 await mongoose.connection.dropDatabase();
 const counts=await seed();
 assert.deepEqual(counts,{products:4,recommendations:121});
 const server=createApp().listen(0),base=`http://127.0.0.1:${server.address().port}`;
 t.after(async()=>{await new Promise(resolve=>server.close(resolve));await mongoose.connection.dropDatabase();await mongoose.disconnect()});
 const health=await fetch(base+'/api/health').then(r=>r.json());assert.equal(health.ok,true);
 const products=await fetch(base+'/api/products').then(r=>r.json());assert.equal(products.length,4);
 const recommendation=await fetch(base+'/api/recommendations?category=Office&moment=Training%20%2F%20Workshop').then(r=>r.json());assert.equal(recommendation.product.slug,'connected');
 const contactResponse=await fetch(base+'/api/contact',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name:'Test User',email:'test@example.com',message:'A meaningful test enquiry.'})});assert.equal(contactResponse.status,201);
 const orderResponse=await fetch(base+'/api/orders',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({customer:{name:'Test User',email:'test@example.com'},items:[{slug:'connected',quantity:2}]})});assert.equal(orderResponse.status,201);const order=await orderResponse.json();assert.equal(order.subtotal,3998);assert.equal(order.paymentStatus,'not_collected');
 const trackedResponse=await fetch(base+`/api/orders/${order.orderNumber}?email=test%40example.com`);assert.equal(trackedResponse.status,200);const tracked=await trackedResponse.json();assert.equal(tracked.status,'demo_received');
});
