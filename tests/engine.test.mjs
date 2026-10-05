import test from 'node:test';
import assert from 'node:assert/strict';
import {orders,auditAttempt,preventDecision,reuseDecision,interception,weightedSavings,recordAction,nearbyBuyers,buyerCompatibility,advanceReuse} from '../app/engine.js';
test('RiderTrust follows deck boundaries: 500m inclusive, 15 seconds exclusive',()=>{
 assert.equal(auditAttempt(500,16).verified,true);
 assert.equal(auditAttempt(501,16).verified,false);
 assert.equal(auditAttempt(184,15).verified,false);
 assert.equal(auditAttempt(184,15.1).verified,true);
});
test('low risk has a smooth dispatch; hub mismatch blocks even low risk',()=>{
 assert.equal(preventDecision(orders[1]).action,'Proceed to dispatch');
 assert.equal(preventDecision(orders[1],{hubMatch:false}).action,'Reroute before handover');
 assert.equal(preventDecision(orders[0],{response:'address'}).action,'Revalidate the address');
});
const good={verified:true,reason:'refusal',optIn:true,velocity:450,fit:'high',hold:2,capacity:9};
test('reuse requires genuine evidence, seller permission, intact item and compatible demand',()=>{
 assert.equal(reuseDecision(good).eligible,true);
 for(const change of [{atHub:false},{refusalHours:25},{verified:false},{optIn:false},{defect:true},{reason:'defect'},{velocity:80},{fit:'low'},{fit:'medium'},{hold:8},{capacity:16}])assert.equal(reuseDecision({...good,...change}).eligible,false,JSON.stringify(change));
 assert.equal(reuseDecision({...good,hold:7,capacity:15,refusalHours:24}).eligible,true);
});
test('unavailability and address problems recover the original delivery',()=>{
 assert.equal(reuseDecision({...good,reason:'unavailable'}).action,'Reschedule delivery');
 assert.equal(reuseDecision({...good,reason:'address'}).action,'Request a nearby landmark');
});
test('quality exclusions override recovery reasons in the reported triage scenario',()=>{
 for(const reason of ['unavailable','address','refusal']){
  assert.equal(reuseDecision({...good,reason,defect:true}).action,'Normal reverse logistics');
 }
});
test('a pre-dispatch or in-transit parcel cannot enter the refusal reuse pool',()=>{
 for(const stage of ['Pre-dispatch','In transit']) assert.equal(reuseDecision({...good,stage}).eligible,false);
});
test('multi-hub decision selects cheapest compatible demand and includes all costs',()=>{
 const d=interception({delhi:true,jaipur:true});assert.equal(d.route,'delhi');assert.equal(d.total,70);assert.equal(d.saving,100);
 const j=interception({delhi:false,jaipur:true});assert.equal(j.route,'jaipur');assert.equal(j.total,83);assert.equal(j.saving,87);
 const r=interception({delhi:false,jaipur:false});assert.equal(r.route,'reverse');assert.equal(r.total,129);assert.equal(r.saving,41);
 for(const x of [d,j,r])assert.equal(x.costs.reduce((n,[,cost])=>n+cost,0),x.total);
 assert.equal(interception({risk:0.75}).allowed,false);
 assert.equal(interception({eligible:false}).allowed,false);
});
test('weighted planning result matches the supplied deck and rejects impossible shares',()=>{
 assert.equal(weightedSavings(20,25),64.3);
 assert.equal(weightedSavings(0,0),41);
 assert.equal(weightedSavings(100,0),100);
 assert.equal(weightedSavings(60,50),null);
});
test('repeated actions cannot inflate savings or duplicate audit records',()=>{
 const state={actions:{},events:[],savings:0};
 assert.equal(recordAction(state,'5519:intercept',{title:'Delhi rematch'},100),true);
 assert.equal(recordAction(state,'5519:intercept',{title:'Delhi rematch'},100),false);
 assert.equal(state.savings,100);assert.equal(state.events.length,1);
 assert.equal(recordAction(state,'5519:reuse',{title:'Local reuse'},130),false);
 assert.equal(state.savings,100);
});

test('nearby demand derives compatibility from the selected SKU and budget',()=>{
 for(const o of orders.filter(x=>x.stage==='Delivery attempt')){
  const [exact,variant,other]=nearbyBuyers(o);
  assert.equal(buyerCompatibility(o,exact).fit,'high');
  assert.equal(buyerCompatibility(o,variant).fit,'medium');
  assert.equal(buyerCompatibility(o,other).canOffer,false);
  assert.equal(buyerCompatibility(o,{...exact,distance:101}).canOffer,false);
  assert.equal(buyerCompatibility(o,{...exact,budget:o.price-1}).canOffer,false);
  if(o.category==='Wearable')assert.equal(buyerCompatibility(o,{...exact,size:'Wrong size'}).canOffer,false);
 }
});
test('a rematch must pass offer, explicit consent, dispatch and outcome in order',()=>{
 const o=orders.find(x=>x.id==='VAL-8842'),buyer=nearbyBuyers(o)[0];
 const context={decision:reuseDecision(good),buyer,compatibility:buyerCompatibility(o,buyer)};
 assert.equal(advanceReuse(null,'dispatch',context),null);
 assert.equal(advanceReuse(null,'deliver',context),null);
 let plan=advanceReuse(null,'offer',context);assert.equal(plan.status,'offered');
 assert.equal(advanceReuse(plan,'deliver',context),null);
 plan=advanceReuse(plan,'accept',context);assert.equal(plan.status,'accepted');
 plan=advanceReuse(plan,'dispatch',context);assert.equal(plan.status,'dispatched');
 plan=advanceReuse(plan,'deliver',context);assert.equal(plan.status,'delivered');
 assert.equal(advanceReuse(plan,'deliver',context),null);
 assert.equal(advanceReuse(plan,'reverse',context),null);
});
test('medium-fit offers need variant consent; changing buyer or eligibility blocks dispatch',()=>{
 const o=orders.find(x=>x.id==='VAL-6204'),buyer=nearbyBuyers(o)[1];
 const context={decision:reuseDecision(good),buyer,compatibility:buyerCompatibility(o,buyer)};
 const offered=advanceReuse(null,'offer',context);
 assert.equal(advanceReuse(offered,'accept',context),null);
 const accepted=advanceReuse(offered,'accept',{...context,mismatchAccepted:true});
 assert.equal(accepted.mismatchAccepted,true);
 assert.equal(advanceReuse(accepted,'dispatch',{...context,buyer:nearbyBuyers(o)[0]}),null);
 assert.equal(advanceReuse(accepted,'dispatch',{...context,decision:reuseDecision({...good,policyAllowed:false})}),null);
 const dispatched=advanceReuse(accepted,'dispatch',context);
 assert.equal(advanceReuse(dispatched,'reverse',context).status,'returned');
});
test('seller policy and low buyer fit prevent a rematch offer',()=>{
 const o=orders[4],buyer=nearbyBuyers(o)[2];
 assert.equal(reuseDecision({...good,policyAllowed:false}).eligible,false);
 assert.equal(reuseDecision({...good,reason:'unknown'}).eligible,false);
 assert.equal(advanceReuse(null,'offer',{decision:reuseDecision(good),buyer,compatibility:buyerCompatibility(o,buyer)}),null);
});
