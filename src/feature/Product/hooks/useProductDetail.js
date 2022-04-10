import productApi from "api/productApi";
import { useEffect, useState } from "react";

export default function useProductDetail(productId){
    const [product,setProduct] = useState({});
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try{
                const response = await productApi.get(productId)
                setProduct(response)
                setLoading(false)
            }
            catch(error) {
                console.error(error)
                setLoading(false);
            }

        })()
    },productId);
    return {
        product,
        loading,
    }
}