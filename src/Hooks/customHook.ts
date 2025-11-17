
export interface FetchReturn{
    message?:string,
    success?:boolean,
    ok:boolean,
    [key:string]:any
}
export async function useFetch(url:string,obj:RequestInit={}):Promise<FetchReturn>{
    const response=await fetch(url,obj)
    return await response.json()
}

export const server_url=import.meta.env.VITE_API_URL as string