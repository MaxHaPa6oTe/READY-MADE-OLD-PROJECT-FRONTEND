export interface IPOST {
    id: number
    title:string
    text:string
    img:string[]
    likes:number
    cmnt:number
    usLike:null|boolean
    createdAt:string
    updateAt:string
}

export interface IUSER {
    id:number
    role:string
    name:string
    years:number
    ava:string|null
    email:string
    createdAt:number
    updateAt:number
}

export interface IComment {
    id:number
    text:string
    likes:number
    avtor:string[]
    usLike:null|boolean
    createdAt:string
    updatedAt:string
    userId:number
    workId:number
}