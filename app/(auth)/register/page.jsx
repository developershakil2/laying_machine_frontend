'use client'
import Nav from '@/app/(components)/Nav';
import React, {useState, useEffect} from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios'

const Register = ()=>{





  const [actualRefLink, setactualRefLink] = useState('')
  useEffect(()=>{
    const reflink  = window.location.href;
  
  const  refLink = new URL(reflink);
  
  const actualRefLink =  refLink?.searchParams.get("id");
  setactualRefLink(actualRefLink)
  },[])
  
  
    const {push} = useRouter();
      const [phone, setPhone] = useState('');
      const [userResponse, setUserResponse] = useState('');
      const [password, setPassword] = useState('');
      const [username, setUsername] = useState('');
      const [fullName, setFullName] = useState('');
      const [selectImage, setSelectImage] = useState('');
      const [previewUrl, setPreviewUrl] = useState('');
      const [referral, setReferral] = useState('');
      const [mod, setMod] = useState(false);
      const [code , setCode] = useState('');
      const [modalTitle, setModalTitle] = useState('');
    const [modalHandle, setModalHandle] = useState('none');
    
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectImage(file);
    
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      };
    
      const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
      };
    
      const signupHandle = () => {
        if (!selectImage) {
          alert('Please select your profile photo.');
          return;
        }
      
        if(password === ""){
          alert("please choose a password")
        }else if(phone === ""){
          alert("please enter your phone");
        }else if(username === ""){
          alert("please enter your name ")
        }else{
        const formData = new FormData();
        formData.append("phone", phone);
        formData.append("username", username);
        formData.append('fullName', fullName);
        formData.append('password', password);
        formData.append('referralCode', actualRefLink);
        const blob = dataURItoBlob(previewUrl);
        const uniqueFilename = `proofImg_${Date.now()}.jpg`;
  
        formData.append('profilePicture', blob, uniqueFilename);
        axios.post("https://layingmachine.onrender.com/user", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((res) => {
          setUserResponse(res.data);
          if(res.status == 200){
            setModalHandle('flex');
            setModalTitle(res.data);
             setTimeout(()=>{
              push('/login')
             },2000);
          }
  
  
        }).catch((err) => {
          console.log(err);
        });
      }
      };

          const modalFunc=()=>{
            setModalHandle('none');
          
          } 

          useEffect(()=>{
              const data = localStorage.getItem('usersOb');
                 const user = JSON.parse(data);
                 if(user?.userId){
                  push('/dashboard');
                 }
          },[])



          
useEffect(()=>{
  const reflink  = window.location.href;

const  refLink = new URL(reflink);

const actualRefLink =  refLink.searchParams.get("id");
setactualRefLink(actualRefLink)
},)



    return(
      <>
      <div style={{display:modalHandle}} className="absolute  bg-[#7e0beb69] z-50 top-0 left-0 w-full h-screen flex justify-center items-center">
             <div  className="w-[320px] flex flex-col p-10 justify-center items-center h-[320px] rounded-xl bg-white">
                   <h2 className="text-md font-bold text-center ">{modalTitle}</h2>
                   <button onClick={modalFunc} className="bg-black p-5 mt-5 rounded-full text-white px-20 font-black">Okay</button>
                   
             </div>
    </div> 


        <div className="home_component1 home_component2">
                <Nav login="login" register="register" />
          
          <div id="register_wrapper" className="home_component  relative pb-10 flex-col items-center justify-between">
       


                 <div className="home_titles w-full pt-[50px]  flex flex-col justify-center items-center">
                     
                     <div className="w-[350px] backdrop-blur-[20px] shadow-lg z-40 px-6 pt-6 pb-3 rounded-xl bg-transparent border-[1px]">
                               <h2 className="w-full text-center text-2xl font-black  text-white">Register</h2>
                    
                               <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Select Profile</span>
                             <input onChange={handleImageChange} type="file" placeholder="Ex: grayson"   className="outline-none w-full placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                             </div>

                             <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">username</span>
                             <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Ex: grayson"   className="outline-none w-full placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                             </div>


                             <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Full Name</span>
                             <input value={fullName} onChange={(e)=> setFullName(e.target.value)} type="text" placeholder="Ex: grayson Vergara"   className="outline-none w-full placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                             </div>



                             <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Phone</span>
                             <input value={phone} onChange={(e)=> setPhone(e.target.value)} type="number" placeholder="Ex: 128947978676"   className="outline-none w-full placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                             </div>


                             <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Password</span>
                             <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="password"   className="outline-none w-full placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                             </div>

                             <div className="w-full rounded-xl py-2 ">
                              <label  name="referral" className="text-white font-bold text-sm ml-3">refercode optional ! *</label>
                              <input type="text" value={actualRefLink? actualRefLink : ''} onChange={(e)=> setReferral(e.target.value)} className="outline-none w-full placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent" placeholder="refer code optional !" />
                          </div>


                             <div className="w-full flex justify-center items-center  rounded-xl py-2 ">
                             <button onClick={()=> signupHandle()} className="bg-black rounded-xl p-4 text-white">Create Account</button>
                           
                             </div>

                             <div className="w-full flex justify-center items-center  rounded-xl py-2 ">
                           <p className="flex text-left  text-white">I have already an account <a href="/login" className="ml-2 text-blue-400">Login</a></p>
                             </div>



                     </div>
          
                 </div>


          <div className="hu1 absolute bottom-2 left-2">
            <img className="w-[300px] h-[300px]" src='images/huz1.gif' alt="home"/>
          </div>
         
       <div className="flower1"></div>
       <div className="flower"></div>
    
          </div>
        </div>
        </>
    )
}


export default Register;