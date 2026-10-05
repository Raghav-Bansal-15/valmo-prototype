export function icon(name) {
 const paths = {
 grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z"/><path d="m8 12 3 3 5-6"/>',
 bolt:'<path d="m13 2-8 12h7l-1 8 8-12h-7z"/>',
 reuse:'<path d="m9 4 3-2 4 7h-5m9 2 2 3-4 7-3-5M4 18H1l4-7 3 5M8 4 4 11m16 2-3-7m-2 15H7"/>',
 route:'<circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M5 7v7c0 4 7 4 7 0V9c0-4 7-4 7 0v8"/>',
 chart:'<path d="M3 3v18h18M7 16l4-5 4 3 6-9"/>',
 arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 box:'<path d="m3 7 9-4 9 4v10l-9 4-9-4zm0 0 9 4 9-4M12 11v10M7 5l10 4"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
 play:'<path d="m8 4 12 8-12 8z"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3"/>',
 pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2"/>',
 people:'<circle cx="9" cy="8" r="4"/><path d="M2 21v-2a7 7 0 0 1 14 0v2m1-17a4 4 0 0 1 0 8m1 3a6 6 0 0 1 4 6"/>',
 close:'<path d="m6 6 12 12M6 18 18 6"/>',
 phone:'<path d="M5 3h4l2 5-3 2c2 3 3 4 6 6l2-3 5 2v4c-1 5-8 1-13-4S0 4 5 3z"/>',
 reset:'<path d="M4 7a9 9 0 1 1-1 9M4 2v6h6"/>'
 };
 return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.box}</svg>`;
}
export function garment(color,type='Wearable') {
 return `<svg viewBox="0 0 48 48" aria-hidden="true">${type==='Wearable'?`<path d="m15 6-11 9 7 9 5-4v23h17V20l5 4 7-9L33 6c-3 7-15 7-18 0" fill="${color}" stroke="#ffffff" stroke-width="1.3"/><path d="M21 14v27M17 29h14" stroke="#ffffff66" fill="none"/>`:`<rect x="7" y="10" width="35" height="30" rx="4" fill="${color}"/><path d="M7 18h35M25 10v30" stroke="#ffffff99" stroke-width="2"/><path d="m14 10 6-5h11l6 5" stroke="${color}" fill="none" stroke-width="3"/>`}</svg>`;
}
export function heroArt() {
return `<svg viewBox="0 0 520 225" role="img" aria-label="A parcel finds a second delivery through the VALMO hub"><defs><pattern id="dotgrid" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1" fill="#ad5b9744"/></pattern></defs><rect width="520" height="225" fill="url(#dotgrid)"/><path d="M20 166C110 166 94 52 190 72S259 166 331 154s97-92 167-82" stroke="#ae5e97" stroke-width="1.5" fill="none" stroke-dasharray="4 5"/><ellipse cx="245" cy="187" rx="93" ry="12" fill="#42073c"/><path d="m170 95 76-44 81 43v74l-80 45-77-44z" fill="#fcb15d"/><path d="m170 95 77 44 80-45-81-43z" fill="#ffdc8c"/><path d="m247 139 80-45v74l-80 45z" fill="#f49655"/><path d="m199 78 80 43 20-11-81-44z" fill="#fff0c6"/><path d="m279 121 20-11v30l-20 11z" fill="#fae0af"/><path d="m189 132 40 23v36l-40-24z" fill="#780968"/><text x="208" y="165" text-anchor="middle" fill="#ffde84" font-size="23" font-weight="700" transform="rotate(29 208 165)">m</text><g transform="translate(350 32)"><rect x="0" y="0" width="126" height="39" rx="9" fill="#fff2d8"/><circle cx="21" cy="20" r="9" fill="#217e57"/><path d="m17 20 3 3 5-6" stroke="white" fill="none" stroke-width="2"/><text x="39" y="24" fill="#620555" font-size="11" font-weight="700">Delivered again.</text></g><g transform="translate(46 103)"><circle cx="0" cy="0" r="25" fill="#8c2377"/><path d="m-10-6 10-6 10 6v13L0 13-10 7zm0 0L0 0l10-6M0 0v13" stroke="#ffcf6d" fill="none" stroke-width="1.5"/></g><circle cx="432" cy="156" r="22" fill="#f80980"/><path d="m422 156 7 7 13-14" stroke="white" fill="none" stroke-width="3"/><circle cx="364" cy="112" r="4" fill="#ffd36d"/><circle cx="123" cy="44" r="3" fill="#f80980"/><text x="350" y="221" text-anchor="middle" fill="#da9cce" font-size="9" letter-spacing="2">SAME PARCEL. NEW POSSIBILITY.</text></svg>`;
}
export function graph(order) {
return `<svg viewBox="0 0 560 220" role="img" aria-label="Illustrative customer-product graph, not live model explanations"><g stroke="#dbc6d6" stroke-width="1.4" fill="none"><path d="M118 112 271 95 419 54M118 112 280 166 423 153M118 112 272 40M271 95 431 105M280 166 419 54M272 40 431 105"/><path d="M271 95 85 46M280 166 81 178" stroke-dasharray="5 5"/></g><g fill="#f3e4ef" stroke="#d1aac8"><circle cx="85" cy="46" r="14"/><circle cx="81" cy="178" r="14"/><circle cx="423" cy="153" r="15"/><circle cx="431" cy="105" r="15"/><circle cx="419" cy="54" r="15"/><circle cx="280" cy="166" r="18"/><circle cx="272" cy="40" r="17"/></g><circle cx="118" cy="112" r="29" fill="#620555"/><circle cx="271" cy="95" r="31" fill="#f80980"/><path d="m106 110 12-7 12 7v13l-12 7-12-7zm0 0 12 7 12-7m-12 7v13" stroke="white" fill="none" stroke-width="1.4"/><g fill="white"><circle cx="271" cy="89" r="7"/><path d="M259 107c0-13 24-13 24 0z"/></g><text x="118" y="154" text-anchor="middle" font-size="10" fill="#620555">${order.sku.split(' · ')[0]}</text><text x="271" y="141" text-anchor="middle" font-size="10" fill="#620555">${order.history?'Customer history':'Cold-start customer'}</text><text x="440" y="184" text-anchor="middle" font-size="9" fill="#8b7988">Neighbouring orders</text></svg>`;
}
export function routeMap(route) {
const delhi=route==='delhi',jaipur=route==='jaipur';
return `<svg viewBox="0 0 600 255" role="img" aria-label="Schematic route from Bengaluru via Delhi to Jaipur"><defs><pattern id="mapgrid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0v30" fill="none" stroke="#eddfe8" stroke-width=".6"/></pattern></defs><rect width="600" height="255" fill="url(#mapgrid)"/><path d="m68 206 67-38 65 15 45-46 45 13 61-58 67 22 92-53" fill="none" stroke="#e1c8d9" stroke-width="15" stroke-linecap="round"/><path d="M92 184C167 182 191 89 302 89s119 61 204 61" fill="none" stroke="#d8bfd2" stroke-width="3" stroke-dasharray="6 7"/><path d="M92 184C167 182 191 89 302 89${jaipur?'s119 61 204 61':''}" fill="none" stroke="#f80980" stroke-width="3"/><circle cx="92" cy="184" r="8" fill="#620555"/><circle cx="302" cy="89" r="23" fill="#f6dae9"/><circle cx="302" cy="89" r="10" fill="#f80980"/><circle cx="506" cy="150" r="8" fill="${jaipur?'#177c50':'#aa8ca3'}"/><g font-family="Arial" font-size="11" font-weight="700" fill="#620555"><text x="92" y="216" text-anchor="middle">Bengaluru</text><text x="302" y="57" text-anchor="middle">Delhi SC</text><text x="506" y="181" text-anchor="middle">Jaipur</text></g><text x="92" y="232" text-anchor="middle" font-size="9" fill="#8b7988">Origin</text><text x="302" y="128" text-anchor="middle" font-size="9" fill="#b30b64">${delhi?'LOCAL REMATCH':'CURRENT INTERCEPT POINT'}</text><text x="506" y="198" text-anchor="middle" font-size="9" fill="#8b7988">${jaipur?'MATCH FOUND':'Original destination'}</text><rect x="31" y="25" width="140" height="24" rx="4" fill="white" stroke="#eadfe7"/><text x="44" y="41" font-size="9" fill="#8b7988">Schematic · not a live GPS map</text></svg>`;
}
