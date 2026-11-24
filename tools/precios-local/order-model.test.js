import assert from 'node:assert/strict';
import {createOrder,transition,nextStatus,isClosed} from './order-model.js';
const items=[{code:'PIZ001',name:'Pizza',price:20000,quantity:2},{code:'TAR001:ADD001',name:'Tarta + ensalada',price:8000,quantity:1}];
const fields={channel:'whatsapp',fulfillment:'delivery',address:'Calle ficticia 123',paymentMethod:'transfer',paymentStatus:'pending'};
let record=createOrder({id:'LC-001',items,fields});
assert.equal(record.total,48000);assert.equal(record.items[0].unitPrice,20000);assert.equal(record.status,'new');
items[0].price=1;assert.equal(record.total,48000);
assert.throws(()=>createOrder({id:'x',items,fields:{...fields,address:''}}));
assert.throws(()=>createOrder({id:'x',items:[],fields}));
assert.throws(()=>createOrder({id:'x',items,fields:{...fields,paymentMethod:'unknown',paymentStatus:'paid'}}));
assert.throws(()=>transition(record,'delivered'));
for(const state of ['confirmed','preparing','ready','dispatched','delivered']){assert.equal(nextStatus(record),state);record=transition(record,state);}
assert.ok(isClosed(record));assert.equal(record.history.length,6);assert.throws(()=>transition(record,'cancelled'));
const pickup=createOrder({id:'LC-002',items,fields:{...fields,fulfillment:'pickup'}});
assert.equal(pickup.address,'');assert.equal(nextStatus({...pickup,status:'ready'}),'delivered');assert.ok(isClosed(transition(pickup,'cancelled')));
console.log('order model: all tests passed');
