'use client'

import React, {useState, useEffect, createContext} from 'react'
import axios from 'axios';
export const Api = createContext();




const ApiProvider = ({children})=>{

    const [Suser, setUser] = useState(null);
    const [userId, setUserId] = useState('')
    
    
    useEffect(()=>{
        axios.get(`https://earnfrenzy.co/getuniqueuser/${userId.userId?userId.userId: '650afa221e97033c7876c931' }`).then((res)=>{
              setUser(res.data);
        })
    },[userId])


      return (
      <Api.Provider value={{Suser, setUserId, userId}}>
         {children}
      </Api.Provider>
       
      )
    

}



export default ApiProvider; 