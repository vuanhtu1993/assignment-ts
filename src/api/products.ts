import instance from "./config"
export const apiGet = (config:String) =>{
    return instance.get(`${config}`);
}
export const getAll = () => {
    return instance.get('/products');
}
export const getOne = (id:String) => {
    return instance.get(`/products/${id}`);
}
export const add = (data:any) => {
    return instance.post(`/products/`,data);
}
export const update = (id:String,data:any) => {
    return instance.put(`/products/${id}`,data);
}
export const remove = (id:String) => {
    return instance.delete(`/products/${id}`);
}
