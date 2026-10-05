import {reuseDecision,nearbyBuyers,buyerCompatibility} from './engine.js';

export function renderReuse({o,state,form,flows,panel,selector,strip,pill,btn,icon,money}) {
  const plan=state.reuse[o.id];
  const status=plan?.status||'ready';
  const locked=['dispatched','delivered','returned'].includes(status);
  const verified=!!state.verified[o.id];
  const decision=reuseDecision({...form,stage:o.stage,verified,velocity:o.velocity,fit:'high'});
  const buyers=nearbyBuyers(o);
  const buyer=buyers.find(x=>x.id===(plan?.buyerId||form.buyerId))||buyers[0];
  const fit=buyerCompatibility(o,buyer);
  const stageIndex={ready:decision.eligible?1:0,offered:2,accepted:3,dispatched:4,delivered:5,returned:4}[status];
  const outcome={offered:'Offer awaiting buyer response',accepted:'Buyer accepted the disclosed item',dispatched:'Parcel re-dispatched locally',delivered:'Delivery completed in this demo',returned:'Rematch failed · normal reverse'};
  const summary=outcome[status]||decision.action;
  const summaryText=status==='offered'?'The offer is awaiting a buyer response. Obtain explicit consent before sending the parcel.':status==='accepted'?'Buyer consent is recorded for this offer. Re-dispatch the parcel locally when ready.':locked?status==='delivered'?'The new buyer received the parcel. Conservative simulated savings were recorded once.':status==='returned'?'Return the parcel through the seller’s normal reverse process. No successful-rematch saving is recorded.':'Await the delivery outcome before recording a successful rematch.':decision.description;
  const disable=locked?'disabled':'';
  const rules=`<label class="toggle-row" for="reuse-hub"><div><b>Parcel received at the destination hub</b><p>Keep the item at Delhi SC while seeking local demand.</p></div><input type="checkbox" id="reuse-hub" ${form.atHub?'checked':''} ${disable}></label>
    <label class="field" for="reuse-hours">Time to mark refusal after hub intake (hours)</label><input id="reuse-hours" type="number" min="0" max="48" value="${form.refusalHours}" ${disable}><p class="help-text">Mark the genuine refusal within 24 hours of hub intake.</p>
    <label class="toggle-row" for="seller"><div><b>Seller opted in for this SKU</b><p>No upfront fee. Seller may override per parcel.</p></div><input type="checkbox" id="seller" ${form.optIn?'checked':''} ${disable}></label>
    <label class="toggle-row" for="reuse-policy"><div><b>Seller policy permits local reuse</b><p>Check the SKU’s return and rematch restrictions.</p></div><input type="checkbox" id="reuse-policy" ${form.policyAllowed?'checked':''} ${disable}></label>
    <label class="toggle-row" for="defect"><div><b>Quality or hygiene exclusion</b><p>Damaged, customised, or hygiene-sensitive item.</p></div><input type="checkbox" id="defect" ${form.defect?'checked':''} ${disable}></label>
    <div class="controls-grid"><div><label for="hold">Hold period (days)</label><input id="hold" type="number" min="0" max="14" value="${form.hold}" ${disable}></div><div><label for="capacity">Hub reuse capacity (%)</label><input id="capacity" type="number" min="0" max="100" value="${form.capacity}" ${disable}></div></div>`;
  const triage=panel('1. Refusal at the destination hub','A failed delivery must pass verification first',`${selector('Delivery attempt')}${strip()}
    <div class="check-row"><span>RiderTrust evidence</span>${pill(verified?'Verified':'Verification required',verified?'success':'warning')}</div>
    <label class="field spaced" for="reason">Failure reason at the hub</label><select class="select" id="reason" ${disable}>
      ${[['refusal','Changed mind · genuine refusal'],['unavailable','Customer unavailable'],['address','Address / landmark not found'],['defect','Damaged / defective product']].map(([v,t])=>`<option value="${v}" ${form.reason===v?'selected':''}>${t}</option>`).join('')}
    </select>${rules}
    <div class="callout ${decision.eligible?'success':'pink'}" role="status" aria-live="polite"><strong>${decision.eligible?'Parcel can enter the reuse pool':decision.action}</strong>${decision.description}</div>
    ${decision.action==='Verify the attempt first'?`<div class="spaced">${btn('Verify this delivery attempt','to-recover','secondary full-width')}</div>`:!decision.eligible?`<div class="spaced">${btn('Record '+decision.action.toLowerCase(),'triage','secondary full-width')}</div>`:''}
    <p class="help-text">Only genuine refusal enters reuse. An unavailable buyer gets a new slot; an address problem gets landmark recovery. Quality exclusions always take precedence.</p>`);

  const demand=decision.eligible||locked?`<div class="reuse-path">${pill(o.category==='Wearable'?'Path A · Wearables':'Path B · Non-wearables','plum')}<p>${o.category==='Wearable'?'Exact size or shade demand is required. Disclose colour or variant differences.':'High local demand is required. Disclose variant differences before acceptance.'}</p></div>
    <label class="field" for="reuse-buyer">Nearby buyer scenario</label><select class="select" id="reuse-buyer" ${status!=='ready'?'disabled':''}>
    ${buyers.map(b=>{const f=buyerCompatibility(o,b);return `<option value="${b.id}" ${b.id===buyer.id?'selected':''}>${b.name} · ${b.distance} km · ${f.fit} fit</option>`;}).join('')}</select>
    <div class="buyer-card"><div class="avatar">${buyer.name.split(' ').map(s=>s[0]).join('')}</div><div><strong>${buyer.name} · synthetic buyer</strong><p>Delhi cluster · ${buyer.distance} km · ${buyer.history} prior sample orders</p></div>${pill(fit.fit+' fit',fit.fit==='high'?'success':fit.fit==='medium'?'warning':'pink')}</div>
    ${fit.checks.map(c=>`<div class="check-row"><span>${c.label}</span>${pill(c.pass?'Match':'Mismatch',c.pass?'success':'warning')}</div>`).join('')}
    <div class="facts"><div class="fact"><span>Buyer budget</span><strong>${money(buyer.budget)}</strong></div><div class="fact"><span>Offered parcel</span><strong>${o.sku}</strong></div><div class="fact"><span>SKU demand</span><strong>${o.velocity} units / week</strong></div></div>
    <p class="help-text">Synthetic demand within a 100 km search radius. High fit: offer normally. Medium fit: disclose the variant. Low fit: skip this buyer.</p>`:
    `<div class="empty-state">${icon('reuse')}<h3>Resolve the failure before matching</h3><p>${decision.description}</p></div>`;

  let confirmation;
  if(!decision.eligible&&!locked) confirmation=`<div class="callout"><strong>Rematch unavailable</strong>${decision.action}. The original order remains in recovery or normal reverse.</div>`;
  else if(status==='ready') confirmation=`<div class="decision"><h3>${fit.canOffer?'Make an offer to this buyer':'Skip this buyer'}</h3><p>${fit.fit==='medium'?`Buyer prefers ${buyer.variant}; this parcel is ${o.sku.split(' · ').at(-1)}. Acceptance must explicitly include that difference.`:fit.fit==='low'?'Category, size, price or delivery fit is unsuitable. Select another nearby buyer.':`Offer ${o.item} at ${money(o.price)}, with its original size and variant clearly disclosed.`}</p>${btn('Send simulated rematch offer','reuse-offer','',!fit.canOffer)}</div>`;
  else if(status==='offered') confirmation=`<div class="decision"><h3>Buyer response required</h3><p>The offer contains ${o.sku}, price ${money(o.price)}, and delivery from Delhi SC. No parcel is re-dispatched yet.</p>
    ${fit.fit==='medium'?`<label class="toggle-row" for="reuse-mismatch"><div><b>Buyer explicitly accepts the variant difference</b><p>Preferred ${buyer.variant}; offered ${o.sku.split(' · ').at(-1)}.</p></div><input id="reuse-mismatch" type="checkbox" ${form.mismatchAccepted?'checked':''}></label>`:''}
    ${btn('Simulate buyer acceptance','reuse-accept','',fit.fit==='medium'&&!form.mismatchAccepted)}${btn('Buyer declines · find another','reuse-decline','secondary')}
    <p class="help-text">This phone-side response is simulated. No real message is sent.</p></div>`;
  else if(status==='accepted') confirmation=`<div class="decision"><h3>Accepted. Ready to re-dispatch.</h3><p>${buyer.name} accepted this exact offer. Relabel the parcel and assign a local delivery. Seller sale follows the standard commission cycle.</p>${btn('Re-dispatch locally','reuse-dispatch')}${btn('Buyer withdraws · find another','reuse-decline','secondary')}</div>`;
  else if(status==='dispatched') confirmation=`<div class="decision"><h3>Await the delivery outcome</h3><p>The same parcel is on its second delivery. The journey is complete only when the new buyer receives it.</p>${btn('Simulate successful delivery','reuse-deliver')}${btn('Simulate failed rematch · normal reverse','reuse-reverse','secondary')}</div>`;
  else confirmation=`<div class="callout ${status==='delivered'?'success':'pink'}"><strong>${summary}</strong>${summaryText}</div>`;
  const economics=panel('Conservative reuse economics','Planning assumptions from the submitted proposal',`<div class="mini-metrics"><div class="mini-metric"><small>Matched parcel benefit</small><strong>₹130</strong><small>Conservative system case: ₹340 − ₹210.</small></div><div class="mini-metric"><small>No-match handling risk</small><strong>₹30</strong><small>Incremental cost; normal reverse still applies.</small></div><div class="mini-metric"><small>Pilot match-rate gate</small><strong>≥30%</strong><small>Break-even: 30 ÷ (130 + 30) = 18.75%.</small></div></div><div class="callout spaced"><strong>Illustrative eligible-pool match rate: 45%</strong>0.45 × ₹130 − 0.55 × ₹30 = ₹42 expected benefit per eligible parcel. This is a planning calculation, not measured impact.</div>`);
  return `${flows()}<div class="reuse-progress" aria-label="Reuse journey">${['Item at hub','Nearby demand','Match & confirm','Re-dispatch','Delivery outcome'].map((t,i)=>`<div class="${stageIndex>=i+1?'done':''}"><span>${i+1}</span>${t}</div>`).join('')}</div>
    <section class="reuse-summary ${decision.eligible&&status!=='returned'?'eligible':''}" role="status" aria-live="polite"><div>${pill(status==='ready'?decision.eligible?'Eligible refusal':'Recovery / exception':status,'plum')}<h3>${summary}</h3><p>${summaryText}</p></div><span class="reuse-summary-parcel">${o.id} · Delhi SC</span></section>
    <div class="module-grid reuse-grid">${triage}<div class="stack">${panel('2. Find nearby demand','Match the product to the next buyer',demand)}${panel('3–5. Confirm, re-dispatch, deliver','Separate actions with a visible outcome',confirmation)}</div></div><div class="spaced">${economics}</div>`;
}
