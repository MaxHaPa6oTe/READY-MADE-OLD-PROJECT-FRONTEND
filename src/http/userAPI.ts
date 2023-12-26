import { IUSER } from "../types/types";
import { $authHost,$host } from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (usr:object) => {
   try{ 
    const response = await $host.post('/api/user/reg',usr)
    
    let res = response.data
    if (res) {
        localStorage.setItem('token',res)
        return jwtDecode(res)
    } 
    } catch (e:any) {
     return console.log(e.response.data || e)
  }
}

export const login = async (email:string,password:string) => {
    try{
    const response = await $host.post('/api/user/login',{email,password})
    let res = response.data.token
    if (res) {
        localStorage.setItem('token',res)
        return jwtDecode(res)
    }
    } catch (e) {
        return "ошибка"
    }
}

export const check = async () => {
    try {
    const response = await $authHost.get('/api/user/auth')
    let proverka = response.data.token
    if (proverka) {
        localStorage.setItem('token',proverka)
        const otvet = jwtDecode<IUSER>(proverka)
        return otvet.id
    } else return 'ошибка'
    } catch (e) {
        return 'ошибка'
    }
}

export const kolpolz = async () => {
    try {
        const count = await $host.get('/api/user/users')
        return count.data
    } catch (e) {
        return 'ошибка на сервере'
    }
}

export const otpravkaPisma = async (usPocht:string) => {
    try {
        const pismo = await $host.get('/api/user/pr?usPocht='+ usPocht)
        return pismo.data
    } catch (e) {
        return 'ошибка'
    }
}

export const poiskUsPocht = async (usPocht:string) => {
    try {
        const poisk = await $host.get('/api/user/reg0?usPocht='+ usPocht)
        return poisk.data
    } catch (e) {
        return 'ошибка1'
    }
}

export const provekraKoda = async (usPochts:string,kods:string) => {
    try {
        const go = await $host.post('/api/user/prKod', {usPochts,kods})
        return go.data
    } catch (e) {
        return e
    }
}

export const prosmotrUsera = async (id:number) => {
    try {
    const infa = await $host.get('/api/user/' + id)
    return infa.data
    } catch (e) {
        return 'ошибка'
    }
}

export const ismenAva = async (go:object) => {
    try {
    const ism = await $authHost.post('/api/user/ava',go)
    return true
    } catch (e) {
        return 'ошибка'
    }
}