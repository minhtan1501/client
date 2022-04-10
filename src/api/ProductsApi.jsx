import axiosClient from './axiosClient'

const productsApi = {
    getAllProducts(data){
        console.log(data)
        const url = '/api/products';
        return axiosClient.get(url,{params: data})
    },
    getProductById(id){
        const url = `/api/products/${id}`;
        return axiosClient.get(url)
    }
};

export default productsApi