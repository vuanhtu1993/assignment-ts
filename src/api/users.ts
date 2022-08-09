import instance from "./config";

export const signin = (data:any) => {
    return instance.post(`/signin/`,data);
} //dang nhap
export const signup = (data:any) => {
    return instance.post(`/signup/`,data);
} //dang ky
