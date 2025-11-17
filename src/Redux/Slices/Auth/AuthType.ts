export interface User{
    email?:string,
    firstName?:string,
    lastName?:string,
    role?:'admin'|'student'|'instructor',
    isVerified?:boolean,
    _id?:string,
    profile?:string,
    isActive:boolean,
    bio?:string,
    totalCourses?:number,
    revenue:number,
    [key:string]:any
}

export interface AuthState{
    user:Partial<User>,
    status:'idle'|'failed'|'succeeded'|'loading',
    error:null|string
}

export interface UserReturn{
    message?:string,
    success?:boolean,
    data?:User,
    [key:string]:any
}

export interface LoginInput{
    email:string,
    password:string
}

