export const pairs=[
 {name:'Self Driven',slugs:['focused','energised'],initials:'F + E',description:'A clear intention. A fresh beginning. For the days you make your own.'},
 {name:'Network',slugs:['focused','connected'],initials:'F + C',description:'Balance clarity with connection. For wherever you’re headed.'},
 {name:'Charming',slugs:['connected','magnetized'],initials:'C + M',description:'Make room for closeness. Arrive as yourself.'},
 {name:'Stud',slugs:['energised','magnetized'],initials:'E + M',description:'Fresh momentum. Your own presence. Two expressions of you.'}
];
export function pairAvailable(slugs,products,cart={}){return slugs.length===2&&new Set(slugs).size===2&&slugs.every(s=>{const p=products.find(p=>p.slug===s);return p&&(cart[s]||0)<Math.min(20,p.stock??20)})}
export function addPairToCart(cart,slugs,products){if(!pairAvailable(slugs,products,cart))throw Error('Choose two available fragrances. Your bag may already contain the maximum quantity.');const next={...cart};slugs.forEach(s=>next[s]=(next[s]||0)+1);return next}
