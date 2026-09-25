import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {initialJourney,journeyReducer,spaces,momentsFor,matchMoment} from '../src/momentFlow.js';
const rows=JSON.parse(readFileSync(new URL('../../server/src/data/recommendations.json',import.meta.url)));
assert.equal(rows.length,121);assert.equal(spaces.length,11);
for(const row of rows){let s={...initialJourney};s=journeyReducer(s,{type:'space',value:row.category});s=journeyReducer(s,{type:'next'});assert.equal(s.step,1);s=journeyReducer(s,{type:'moment',value:row.moment});s=journeyReducer(s,{type:'next'});assert.equal(s.step,2);s=journeyReducer(s,{type:'reveal'});assert.equal(s.step,3);assert.equal(matchMoment(s.space,s.moment),row.fragrance.toLowerCase());s=journeyReducer(s,{type:'restart'});assert.deepEqual(s,initialJourney)}
assert.equal(matchMoment('Office','Deep Work'),'focused');assert.equal(matchMoment('Office','Training / Workshop'),'connected');assert.equal(matchMoment('Office','Office Party'),'magnetized');assert.equal(matchMoment('Office','Monday Motivation'),'energised');
for(const type of ['next','reveal'])assert.deepEqual(journeyReducer(initialJourney,{type}),initialJourney);
assert.deepEqual(journeyReducer(initialJourney,{type:'space',value:'invented'}),initialJourney);
const review={step:2,space:'Office',moment:'Deep Work'};
assert.equal(journeyReducer(review,{type:'edit-moment'}).moment,'Deep Work');
assert.equal(journeyReducer(review,{type:'space',value:'Office'}).moment,'Deep Work');
const changed=journeyReducer(review,{type:'space',value:'Family'});assert.equal(changed.moment,'');assert.equal(matchMoment('Family','Deep Work'),null);assert.ok(!momentsFor('Family').includes('Deep Work'));
assert.deepEqual(journeyReducer(changed,{type:'moment',value:'Deep Work'}),changed);
const finder=readFileSync(new URL('../src/pages/Finder.jsx',import.meta.url),'utf8');assert.ok(!finder.includes('api.categories'));assert.ok(!finder.includes('api.recommendation'));
console.log('PASS all 121 complete finder journeys, all 4 results, required selections, invalid pairs, back/edit/reset, and API-independent discovery');
for(const row of rows){let s=journeyReducer(initialJourney,{type:'select-space',value:row.category});assert.equal(s.step,1);s=journeyReducer(s,{type:'select-moment',value:row.moment});assert.equal(s.step,2);s=journeyReducer(s,{type:'reveal'});assert.equal(s.step,3);assert.equal(matchMoment(s.space,s.moment),row.fragrance.toLowerCase())}
assert.deepEqual(journeyReducer(initialJourney,{type:'select-space',value:'invented'}),initialJourney);
assert.deepEqual(journeyReducer(initialJourney,{type:'select-moment',value:'Deep Work'}),initialJourney);
assert.ok(!finder.includes('01 /'));assert.ok(!finder.includes('02 /'));assert.ok(!finder.includes('03 /'));
console.log('PASS 121 automatic selection journeys and invalid-selection guards');
