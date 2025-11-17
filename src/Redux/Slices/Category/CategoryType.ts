
export interface Category{
    _id:string,
    name:string,
    url:string
}

export interface CategorySliceState{
    category:Category[],
    error:string|null,
    status:'idle'|'failed'|'succeeded'|'loading'
}

export interface CategoryReturn{
    data:Category[],
    success:boolean,
    message:string,
    [key:string]:any
}