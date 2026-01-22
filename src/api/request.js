import { api, getApiError } from './client'

export const request = async (url, options = {})=>{

    try{
        const res = await api.request({
            url,
            method:"GET",
            ...options
        });
        return res.data
    }catch(err){
        throw new Error(getApiError(err))
    }
}