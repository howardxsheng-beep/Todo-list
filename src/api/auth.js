import { request } from './request'

export const signUp = (payload)=>{
    return request('/users/sign_up',
        {method:"POST", 
        data:payload,
        });
}