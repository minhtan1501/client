import React from 'react'
import categoryApi from '../../../api/categoryApi';

function GetCategory() {
    const [categories,setCategories] = React.useState([]);
    React.useEffect(() => {
        (async ()=>{
            try{

                const res = await categoryApi.getAllCategory();
                setCategories(res)
            }
            catch(err) {
                
            }

        })()
    },[])
  return categories
}

export default GetCategory