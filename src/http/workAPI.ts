import { IPOST } from "../types/types";
import { $authHost,$host } from "./index";

export const getAllWorks = async (user:any) => {
    try{ 
        if (user) {
           const response = await $authHost.get<IPOST[]>('/api/post')
           return response.data
        } else {
            const response = await $host.get<IPOST[]>('/api/post')
           return response.data
        }
     } catch (e:any) {
    return e.response.data
   }
 }
 export const axiosConfig = {
   headers: {
       'Content-Type': 'text/javascript;charset=UTF-8',
       "Access-Control-Allow-Origin": "*",
      //  "APITOKEN": API_TOKEN
   }
};
 export const getOneWork = async (user:any,id:number) => {
   try{ 
       if (user) {
          const response = await $authHost.get('/api/post/'+ id)
          return response.data
       } else {
           const response = await $host.get(`/api/post/${id}`,axiosConfig)
          return response.data
       }
    } catch (e) {
   return 
  }
}