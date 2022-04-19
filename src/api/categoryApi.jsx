import axiosClient from './axiosClient'

const categoryApi = {
    getAllCategory(data){
        const url = '/api/category';
        return axiosClient.get(url,{params: data})
    },
    getCategoryById(id){
        const url = `/api/products/${id}`;
        return axiosClient.get(url)
    },
    createCategory(data,token){
        const url = '/api/category/';
        return axiosClient.post(url,data,{
            withCredentials: true,
            headers: {Authorization: token}}
        )
    },
    deleteCategoryById(id,token){
        const url = `/api/category/${id}`;
        return axiosClient.delete(url,{
            withCredentials: true,
            headers: {Authorization: token}}
        )
    },
    updateCategoryById(data,id,token){
        const url = `/api/category/${id}`;
        return axiosClient.put(url,data,{
            withCredentials: true,
            headers: {Authorization: token}}
        )
    }
};

export default categoryApi