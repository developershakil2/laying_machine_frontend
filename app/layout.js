'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import React, {useState, useEffect, createContext} from 'react'
const inter = Inter({ subsets: ['latin'] });
import axios from 'axios';
export const Api = createContext();


export const metadata = {
  title: 'laying machine play and earn',
  description: 'laying machine best investment place play and earn',
}

export default function RootLayout({ children }) {

const [Suser, setUser] = useState(null);
const [userId, setUserId] = useState('')


useEffect(()=>{
    axios.get(`https://layingmachine.onrender.com/getuniqueuser/${userId?.userId?userId?.userId: '650a3c70cb1b7b9c901d6f0c' }`).then((res)=>{
          setUser(res.data);
    })
},[userId])
  return (
  <Api.Provider value={{Suser, setUserId, userId}}>
 <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  </Api.Provider>
   
  )
}
