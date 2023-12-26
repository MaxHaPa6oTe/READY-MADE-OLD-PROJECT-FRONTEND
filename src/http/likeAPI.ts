import { $authHost } from "./index";

export const postavitLike = async (idWork:number,idCmnt:null|number) => {
    try{ 
        await $authHost.post('/api/like',{idCmnt,idWork})    
     } catch (e:any) {
    return alert(e.response.data)
   }
 }
