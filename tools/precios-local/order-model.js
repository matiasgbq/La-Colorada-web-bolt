// Modelo de dominio V1. Sin dependencias de interfaz, red ni almacenamiento.
// Contrato provisional para el piloto; el servidor deberá validar precios y permisos.
export const labels = {
  channel: {counter:'Mostrador', phone:'Teléfono', whatsapp:'WhatsApp', web:'Web'},
  fulfillment: {counter:'Mostrador', pickup:'Retiro', delivery:'Delivery'},
  paymentMethod: {unknown:'A definir', cash:'Efectivo', transfer:'Transferencia', card:'Tarjeta', other:'Otro'},
  paymentStatus: {pending:'Pendiente', paid:'Pagado'},
  status: {new:'Nuevo', confirmed:'Confirmado', preparing:'En preparación', ready:'Listo', dispatched:'En camino', delivered:'Entregado', cancelled:'Cancelado'}
};
export const isClosed = order => ['delivered','cancelled'].includes(order.status);
export function nextStatus(order) {
  return ({new:'confirmed', confirmed:'preparing', preparing:'ready', ready:order.fulfillment==='delivery'?'dispatched':'delivered', dispatched:'delivered'})[order.status] ?? null;
}
export function createOrder({id, items, fields, now = new Date().toISOString()}) {
  if (!items.length) throw new Error('Agregá al menos un plato.');
  const clean = key => String(fields[key] ?? '').trim();
  for (const key of ['channel','fulfillment','paymentMethod','paymentStatus']) {
    if (!Object.hasOwn(labels[key],clean(key))) throw new Error('Revisá los datos del pedido.');
  }
  if (clean('fulfillment')==='delivery' && !clean('address')) throw new Error('Completá la dirección para delivery.');
  if (clean('paymentStatus')==='paid' && clean('paymentMethod')==='unknown') throw new Error('Indicá el medio de pago antes de marcarlo pagado.');
  const lines = items.map(item => {
    if (!item.code || !Number.isSafeInteger(item.quantity) || item.quantity<=0 || !Number.isFinite(item.price) || item.price<0) throw new Error('Hay un renglón inválido.');
    return {code:item.code, name:item.name, quantity:item.quantity, unitPrice:item.price, subtotal:item.price*item.quantity};
  });
  return {id, schemaVersion:1, channel:clean('channel'), fulfillment:clean('fulfillment'),
    customer:{name:clean('customer'), phone:clean('phone')},
    address:clean('fulfillment')==='delivery'?clean('address'):'',
    notes:clean('notes'), paymentMethod:clean('paymentMethod'), paymentStatus:clean('paymentStatus'),
    currency:'ARS', items:lines, total:lines.reduce((sum,line)=>sum+line.subtotal,0),
    status:'new', createdAt:now, updatedAt:now, history:[{status:'new',at:now}],
    conversationRef:null, demo:true};
}
export function transition(order,status,now=new Date().toISOString()) {
  if (isClosed(order) || (status!==nextStatus(order) && status!=='cancelled')) throw new Error('Transición inválida.');
  return {...order,status,updatedAt:now,history:[...order.history,{status,at:now}]};
}
