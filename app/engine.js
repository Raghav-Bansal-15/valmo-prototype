// Demonstration policy from the supplied deck. These are not model predictions.
export const orders = [
  {id:'VAL-9821',customer:'Priya S.',item:'Printed cotton kurti',category:'Wearable',sku:'KRT-204 · M · Rose',price:799,payment:'COD',risk:0.84,history:12,returns:0.384,velocity:450,hub:'Delhi SC',city:'New Delhi',stage:'Pre-dispatch',reason:'Changed plans',color:'#ef789f'},
  {id:'VAL-4410',customer:'Aman K.',item:'Kitchen storage set',category:'Non-wearable',sku:'HME-118 · Set of 4',price:249,payment:'Prepaid',risk:0.12,history:45,returns:0.042,velocity:1200,hub:'Delhi SC',city:'New Delhi',stage:'Pre-dispatch',reason:'Low risk',color:'#e5b962'},
  {id:'VAL-7732',customer:'Neha R.',item:'Wireless headphones',category:'Non-wearable',sku:'ELC-322 · Black',price:1299,payment:'COD',risk:0.68,history:0,returns:null,velocity:80,hub:'Delhi SC',city:'New Delhi',stage:'Pre-dispatch',reason:'No order history',color:'#a79ce2'},
  {id:'VAL-6204',customer:'Rahul M.',item:'Everyday running shoes',category:'Wearable',sku:'SHO-092 · 8 · White',price:899,payment:'COD',risk:0.76,history:8,returns:0.25,velocity:320,hub:'Delhi SC',city:'New Delhi',stage:'Delivery attempt',reason:'Customer not home',color:'#b8c4b4'},
  {id:'VAL-8842',customer:'Sneha A.',item:'Ceramic dinner set',category:'Non-wearable',sku:'HME-305 · Ivory',price:1199,payment:'COD',risk:0.71,history:6,returns:0.17,velocity:260,hub:'Delhi SC',city:'New Delhi',stage:'Delivery attempt',reason:'Genuine refusal',color:'#ddb8a1'},
  {id:'VAL-5519',customer:'Kavya P.',item:'Relaxed linen shirt',category:'Wearable',sku:'SHR-156 · L · Sand',price:899,payment:'COD',risk:0.87,history:18,returns:0.29,velocity:410,hub:'Delhi SC',city:'Jaipur',stage:'In transit',reason:'Cancellation intent',color:'#c4af88'}
];
export const policy = {geofence:500,minCall:15,maxHold:7,maxCapacity:15,baseline:170,operating:10};
export function auditAttempt(gps,call) {
  const gpsPass = Number(gps) <= policy.geofence;
  const callPass = Number(call) > policy.minCall;
  return {gpsPass,callPass,verified:gpsPass && callPass};
}
export function preventDecision(order, {hubMatch=true,response='pending'}={}) {
  if (!hubMatch) return {action:'Reroute before handover',tone:'warning',description:'Assigned hub does not match the serviceability zone. Correct the hub before dispatch.'};
  if (response === 'confirmed') return {action:'Delivery confirmed',tone:'success',description:'Buyer confirmed the delivery. Keep the promised slot and proceed to handover.'};
  if (response === 'address') return {action:'Revalidate the address',tone:'warning',description:'Buyer requested an address update. Hold handover until the updated zone is verified.'};
  if (order.risk < 0.5) return {action:'Proceed to dispatch',tone:'success',description:'Low demo risk. No nudge is proposed; preserve a smooth checkout experience.'};
  return {action:'Send a confirmation nudge',tone:'pink',description:'Medium or high demo risk. Ask the buyer to confirm the address and delivery slot.'};
}
export function reuseDecision({stage='Delivery attempt',verified,reason,atHub=true,refusalHours=6,defect=false,optIn=true,policyAllowed=true,velocity=450,fit='high',hold=2,capacity=9}) {
  if (stage !== 'Delivery attempt') return {eligible:false,action:'Wait for a destination-hub refusal',description:'Pre-dispatch and in-transit parcels cannot enter the failed-delivery reuse pool.'};
  if (defect || reason === 'defect') return {eligible:false,action:'Normal reverse logistics',description:'Quality defects, customised products and hygiene exclusions override recovery or rematch. Keep this parcel out of reuse.'};
  if (!verified) return {eligible:false,action:'Verify the attempt first',description:'A failed attempt must pass RiderTrust before a parcel enters the reuse flow.'};
  if (reason === 'unavailable') return {eligible:false,action:'Reschedule delivery',description:'Buyer is unavailable. Keep the original order and arrange another slot.'};
  if (reason === 'address') return {eligible:false,action:'Request a nearby landmark',description:'Suspend handover, collect the corrected landmark, and revalidate the address within 48 hours.'};
  if (reason !== 'refusal') return {eligible:false,action:'Select a verified failure reason',description:'Only a genuine refusal can enter the reuse pool.'};
  if (!atHub) return {eligible:false,action:'Receive the parcel at the destination hub',description:'Only a refused parcel physically received at the destination hub can enter local reuse.'};
  if (refusalHours > 24) return {eligible:false,action:'Normal reverse logistics',description:'The refusal was not marked within the proposal’s 24-hour intake window.'};
  if (!optIn) return {eligible:false,action:'Normal reverse logistics',description:'Seller has not opted in for this SKU.'};
  if (!policyAllowed) return {eligible:false,action:'Normal reverse logistics',description:'Seller-specific return policy does not permit rematching this parcel.'};
  if (hold > policy.maxHold || capacity > policy.maxCapacity) return {eligible:false,action:'Normal reverse logistics',description:'The seven-day hold limit or 15% hub capacity limit has been exceeded.'};
  if (velocity < 200) return {eligible:false,action:'Normal reverse logistics',description:'Local demand is too low for this demo reuse rule (200 units/week).'};
  if (fit === 'low') return {eligible:false,action:'Find another buyer',description:'Low compatibility. Skip this buyer and preserve the parcel’s hold window.'};
  if (fit === 'medium') return {eligible:false,action:'Show alternatives to the buyer',description:'Disclose the variant mismatch and wait for an explicit buyer choice.'};
  return {eligible:true,action:'Match & re-dispatch locally',description:'Verified refusal, seller permission and high local demand. Find a compatible buyer and obtain consent before re-dispatch.',saving:130};
}
export function interception({risk=0.87,delhi=true,jaipur=true,eligible=true}) {
  if (risk <= 0.75 || !eligible) return {allowed:false,action:'Continue the original route',saving:0,total:170,description:'Interception needs intent above 0.75 and a reusable parcel.'};
  const route = delhi ? 'delhi' : jaipur ? 'jaipur' : 'reverse';
  const base = route === 'delhi' ? 60 : route === 'jaipur' ? 73 : 119;
  return {allowed:true,route,total:base + policy.operating,saving:policy.baseline-base-policy.operating,
    action:route === 'delhi' ? 'Rematch at Delhi SC' : route === 'jaipur' ? 'Forward to Jaipur demand' : 'Return from Delhi SC',
    costs: route === 'delhi' ? [['Forward to Delhi',24],['Handling & relabel',15],['Local delivery',21],['Operating cost',10]] : route === 'jaipur' ? [['Forward to Delhi',24],['Handling & relabel',15],['Delhi → Jaipur',13],['Local delivery',21],['Operating cost',10]] : [['Forward to Delhi',24],['Handling & QC',30],['Partial reverse',65],['Operating cost',10]],
    description:route === 'reverse' ? 'No compatible demand at either hub. Use partial reverse logistics.' : 'Choose the lowest-cost compatible demand across both hubs.'};
}
export function nearbyBuyers(order) {
  const parts=order.sku.split(' · '),size=order.category==='Wearable'?parts[1]:null,variant=parts.at(-1);
  return [
    {id:'exact',name:'Ananya S.',distance:18,category:order.category,size,variant,budget:order.price+150,history:14},
    {id:'variant',name:'Karan R.',distance:42,category:order.category,size,variant:variant==='Ivory'?'Grey':'Blue',budget:order.price+100,history:8},
    {id:'other',name:'Megha K.',distance:76,category:order.category==='Wearable'?'Non-wearable':'Wearable',size:'S',variant:'Other',budget:Math.round(order.price*.6),history:3}
  ];
}
export function buyerCompatibility(order,buyer) {
  const checks=[
    {label:'Nearby demand · within 100 km',pass:buyer.distance<=100},
    {label:'Category preference',pass:buyer.category===order.category},
    {label:'Price within buyer budget',pass:order.price<=buyer.budget},
    {label:order.category==='Wearable'?'Required size':'Size not required for this category',pass:order.category!=='Wearable'||buyer.size===order.sku.split(' · ')[1]},
    {label:'Colour / variant preference',pass:buyer.variant===order.sku.split(' · ').at(-1)}
  ];
  const hardPass=checks.slice(0,4).every(x=>x.pass);
  const fit=!hardPass?'low':checks[4].pass?'high':'medium';
  return {fit,canOffer:fit!=='low',checks};
}
export function advanceReuse(plan,event,{decision,buyer,compatibility,mismatchAccepted=false}={}) {
  const status=plan?.status||'ready';
  if(event==='offer' && status==='ready' && decision?.eligible && compatibility?.canOffer) return {status:'offered',buyerId:buyer.id};
  const valid=decision?.eligible && compatibility?.canOffer && buyer?.id===plan?.buyerId;
  if(event==='accept' && status==='offered' && valid && (compatibility.fit==='high'||mismatchAccepted)) return {...plan,status:'accepted',mismatchAccepted};
  if(event==='dispatch' && status==='accepted' && valid && (compatibility.fit==='high'||plan.mismatchAccepted)) return {...plan,status:'dispatched'};
  if(event==='deliver' && status==='dispatched') return {...plan,status:'delivered'};
  if(event==='reverse' && ['offered','accepted','dispatched'].includes(status)) return {...plan,status:'returned'};
  return null;
}
export function weightedSavings(delhiShare,jaipurShare) {
  if (delhiShare < 0 || jaipurShare < 0 || delhiShare+jaipurShare > 100) return null;
  const reverse = 100-delhiShare-jaipurShare;
  return (delhiShare*100 + jaipurShare*87 + reverse*41)/100;
}
export function recordAction(state,key,event,saving=0) {
  if (state.actions[key]) return false;
  const terminal = key.match(/^(.*):(reuse|intercept)$/);
  if (terminal && (state.actions[terminal[1]+':reuse'] || state.actions[terminal[1]+':intercept'])) return false;
  state.actions[key] = true;
  state.events.unshift({...event,saving,at:new Date().toISOString()});
  state.savings += saving;
  return true;
}
