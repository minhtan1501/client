import axiosClient from './axiosClient'
const paymentApi = {
    createPayment(data,token){
        const url = '/api/payment';
        return axiosClient.post(url,data,{
            withCredentials: true,
            headers: {Authorization: token}
        })
    }
};

export default paymentApi