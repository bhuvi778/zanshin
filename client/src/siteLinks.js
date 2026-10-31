// Set this public URL when the brand supplies its Instagram or other social handle.
// In a hosted build, VITE_ZANSHIN_CIRCLE_URL can supply the same setting.
export const siteLinks={circleSocial:import.meta.env.VITE_ZANSHIN_CIRCLE_URL||''};
export function socialDestination(value=siteLinks.circleSocial){
 try{const url=new URL(value);return url.protocol==='https:'?url.href:''}catch{return ''}
}
