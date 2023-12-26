import { IComment } from "../types/types";
import { $authHost,$host } from "./index";

 export const pokazKomments = async (user:any,id:number,limit:number) => {
   try{ 
       if (user) {
          const response = await $authHost.get<IComment[]>('/api/comments/'+ id + '?limit=' + limit)
          return response.data
       } else {
           const response = await $host.get<IComment[]>('/api/comments/' + id + '?limit=' + limit)
          return response.data
       }
    } catch (e) {
   return 
  }
}

export const createCmnt = async (user:any,text:string,workId:number) => {
   try {
      if (user) {
      const response = await $authHost.post('/api/comments',{text,workId})
      return response.data
      } else alert("не авторизован")
   } catch (e:any) {
      alert(e.response.data || 'ошибка')
   }
}

export const deleteCmnt = async (idCmnt:number) => {
   try {
      await $host.delete('/api/comments/del?idCmnt=' + idCmnt)
      return false
   } catch (err) {
      return console.log(err)
   }
}