import axiosClient from './axiosClient'

const productsApi = {
    getAllProducts(data){
        const url = '/api/products';
        return axiosClient.get(url,{params: data})
    },
    getProductById(id){
        const url = `/api/products/${id}`;
        return axiosClient.get(url)
    },
    createProduct(data,token){
        const url = '/api/products';
        return axiosClient.post(url,data,{
            headers:{Authorization: token}
        })
    },
    updateProduct(id,data,token){
        const url = `/api/products/${id}`;
        return axiosClient.put(url,data,{
            headers:{Authorization: token}
        })
    }
};

export default productsApi