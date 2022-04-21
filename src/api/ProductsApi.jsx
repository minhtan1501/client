import axiosClient from './axiosClient'

const productsApi = {
    getAllProducts(data){
        const url = `/api/products?${data}`;
        return axiosClient.get(url)
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
    },
    deleteProduct(id,token){
        const url = `/api/products/${id}`;
        return axiosClient.delete(url,{
            headers:{Authorization: token}
        })
    }
};

export default productsApi