// One source of truth: the exact occasion map also used by the API seed.
import rows from '../../server/src/data/recommendations.json' with {type:'json'};
const validSlugs=new Set(['focused','energised','connected','magnetized']);
const keys=new Set();
for(const row of rows){const key=JSON.stringify([row.category,row.moment]);if(!row.category||!row.moment||!validSlugs.has(row.fragrance?.toLowerCase())||keys.has(key))throw Error('Invalid occasion catalogue');keys.add(key)}
export const spaces=[...new Set(rows.map(r=>r.category))];
export const momentsFor=space=>rows.filter(r=>r.category===space).map(r=>r.moment);
export const matchMoment=(space,moment)=>rows.find(r=>r.category===space&&r.moment===moment)?.fragrance.toLowerCase()||null;
export const initialJourney={step:0,space:'',moment:''};
export function journeyReducer(state,action){switch(action.type){
 case 'select-space':return spaces.includes(action.value)?{step:1,space:action.value,moment:state.space===action.value?state.moment:''}:state;
 case 'select-moment':return state.step===1&&matchMoment(state.space,action.value)?{...state,step:2,moment:action.value}:state;
 case 'space':return spaces.includes(action.value)?{step:0,space:action.value,moment:state.space===action.value?state.moment:''}:state;
 case 'moment':return momentsFor(state.space).includes(action.value)?{...state,moment:action.value}:state;
 case 'next':return state.step===0&&spaces.includes(state.space)?{...state,step:1}:state.step===1&&matchMoment(state.space,state.moment)?{...state,step:2}:state;
 case 'reveal':return state.step===2&&matchMoment(state.space,state.moment)?{...state,step:3}:state;
 case 'back':return {...state,step:Math.max(0,state.step-1)};
 case 'edit-space':return {...state,step:0};case 'edit-moment':return state.space?{...state,step:1}:state;
 case 'restart':return {...initialJourney};default:return state;
}}
