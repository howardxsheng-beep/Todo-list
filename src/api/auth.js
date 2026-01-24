import { request } from './request'

export const signUp = (payload)=>{
    return request('/users/sign_up',
        {
            method: "POST", 
            data: payload,
        });
};

export const signIn = (payload)=>{
    return request('/users/sign_in',
        {
            method:"POST",
            data:payload,
        });
};

