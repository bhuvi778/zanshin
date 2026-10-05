const base=(import.meta.env.VITE_API_URL||'').replace(/\/$/,'');
export const mediaURL=value=>value?.startsWith('/api/')?base+value:value;
export async function request(path,{method='GET',body,headers={}}={}){
 const isForm=body instanceof FormData;
 const response=await fetch(base+path,{method,credentials:'include',headers:{'X-Zanshin-Request':'1',...(!isForm&&body?{'Content-Type':'application/json'}:{}),...headers},body:body?(isForm?body:JSON.stringify(body)):undefined});
 if(!response.headers.get('content-type')?.includes('application/json'))throw new Error('The service is unavailable. Please try again shortly.');
 const data=await response.json();
 if(!response.ok){const error=new Error(data.message||'Unable to complete this request.');error.status=response.status;throw error}
 return data;
}
export async function uploadMedia(file){const body=new FormData();body.append('file',file);return request('/api/media',{method:'POST',body})}
