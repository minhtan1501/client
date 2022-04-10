import axiosClient from './axiosClient'
import axios from 'axios'
const userApi = {
    register(data){
        const url = '/user/register';
        return axiosClient.post(url,data,{withCredentials: true})
    },
    login(data){
        const url = '/user/login';
        return axiosClient.post(url,data,{withCredentials: true})
    },
    refreshToken(){
        const url = '/user/refresh_token';
        return axiosClient.get(url,{withCredentials: true,headers: {'Access-Control-Allow-Origin': '*'}})
    },
    getUser(data){
        const url = '/user/infor';
        return axiosClient.get(url,{
            withCredentials: true,
            headers: {Authorization: data}
        })
    },
    logout(){
        const url = 'user/logout';
        return axiosClient.get(url)
    },
    addCart(data){
        const url = 'user/addcart';
        return axiosClient.patch(url,data.cart,{
            withCredentials: true,
            headers: {Authorization: data.token}
        })
    },
    getHistory(data){
        const url = 'user/history';
        return axiosClient.get(url,{
            withCredentials: true,
            headers: {Authorization: data.token}
        })
    }
};

export default userApi