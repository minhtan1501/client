import React from 'react'
import { useSelector } from 'react-redux'
import userApi from '../../api/userApi';

function HistoryOder() {
    const user = useSelector(state => state.user);
    React.useEffect(()=>{
        (async()=>{
            try{
                
                if(user?.token){
                    console.log(user.token);
                    const res = await userApi.getHistory({token:user?.token});
                    console.log(res)
                }
            }catch(err){

            }
        })()
    },[user])
  return (
    <div>HistoryOder</div>
  )
}

export default HistoryOder