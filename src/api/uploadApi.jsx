import axiosClient from './axiosClient'

const uploadApi = {
    upload(data,token) {
        const url = '/api/upload';
        return axiosClient.post(url,data,{
            headers: {'content-Type': 'multipart/form-data', Authorization:token}
        })
    },
    destroyImg(data,token) {
        const url = '/api/destroy';
        return axiosClient.post(url,data,{
            headers:{Authorization: token}
        })
    }
}

export default uploadApi;