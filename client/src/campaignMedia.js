import {asset} from './data';
import {fragranceDirection} from './brandDirection';

export const campaignImage = slug => asset(fragranceDirection[slug].discoveryImage||`enso-home/${fragranceDirection[slug].discoveryScene}.webp`);
export const campaignMoments = [
  ['focused', 'A clearer morning', 'A little clarity for the work in front of you.'],
  ['energised', 'New energy', 'Find your rhythm. Keep moving.'],
  ['connected', 'Time together', 'Make a little more room for your people.'],
  ['magnetized', 'Own your evening', 'Arrive as yourself. Let the moment unfold.']
].map(([productSlug, title, body]) => ({
  id: productSlug, productSlug, title, body, label: 'Campaign moment',
  image: campaignImage(productSlug), video: '', mediaType: 'image'
}));

// Retire only bundled sample media. Preserve media uploaded through the studio.
export function consistentCampaign(entry) {
  const slug = entry.productSlug;
  if (!fragranceDirection[slug]) return entry;
  const bundled = [
    `/films/${slug}-original-poster.png`,
    `/assets/home-approved/${slug}.webp`,
    `/assets/enso-home/discovery-${slug}-life-v4.webp`
  ];
  const sampleVideo = `/films/${slug}-original-motion.mp4`;
  if (!bundled.includes(entry.image) || (entry.video && entry.video !== sampleVideo)) return entry;
  return {...entry, image: campaignImage(slug), video: '', mediaType: 'image', label: 'Campaign moment'};
}
