'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const contact = () => {
  const {push} = useRouter();
  const [user, setUser] = useState('');
  const [resBuy, setResBuy] = useState('');
  const [test, setTest] = useState();
  console.log(test)
  const [modalTitle, setModalTitle] = useState(
    'Please confirm to buy chicken. Current chicken price is '
  );
  const [modalHandle, setModalHandle] = useState('none');
  const [farmPrice, setFarmPrice] = useState(1000);
  const [feedPrice, setFeedprice] = useState(400);
  const [codata, setcodata] = useState()
  useEffect(()=>{
    const data = localStorage.getItem('usersOb');
    const codata = JSON.parse(data);
    setcodata(codata);
   },[])

  const [m2, setM2] = useState(false);
  const [farm, setFarm] = useState([]);
  const id = user?.userId;
console.log(user.userId)

  useEffect(() => {
    const data = localStorage.getItem('usersOb');
  
    const codata = JSON.parse(data);
    setUser(codata);
  }, []);

  const getData = () => {
    axios
      .get(`https://layingmachine.onrender.com/purchasedata/${user.userId}`)
      .then((res) => {
        setFarm(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
 
      getData();
   
  }, [user]);

  const buyFarmData = {
    userId: user.userId,
    buyAmount: farmPrice,
    isBuy: true,
  };

  const purchaseHandler = () => {
    axios
      .post(`https://layingmachine.onrender.com/buy-farm/`, buyFarmData)
      .then((res) => {
       
        if (res.status == 400) {
          setModalTitle(res.data.error);
          setM2(true);
        }else{
          setModalTitle(res.data.message);
          setM2(true);
          push('/dashboard');
          setTimeout(()=>{
            push('/farm')
          },2000)
        }
        setResBuy(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const buyFeed = (purchaseId)=>{

     axios.post('https://layingmachine.onrender.com/buy-feed', {
       userId:codata.userId,
       fishPurchaseId:purchaseId,
       feedPrice:feedPrice
     }).then((res)=>{
        
      if(res.status == 400){
        setModalHandle('flex')
        setModalTitle(res.data.error);
        setM2(true);
      }else{
        setModalHandle('flex')
        setModalTitle(res.data.message);
        setM2(true);
      }
      
     
     }).catch((err)=>{
      console.log(err);
     })
  }
  
  const Feed = (fishPurchaseId, userId)=>{
          axios.post('https://layingmachine.onrender.com/feed',{
            fishPurchaseId:fishPurchaseId,
            userId:userId,
          }).then((res)=>{
            if(res.status == 400){
              setModalHandle('flex')
              setModalTitle(res.data.error);
              setM2(true);
            }else{
              setModalHandle('flex')
              setModalTitle(res.data.message);
              setM2(true);
            }
          }).catch((err)=>{
            console.log(err);
          })
  }

  const claim = (fishPurchaseId, userId)=>{
    axios.post('https://layingmachine.onrender.com/claim-earn',{
      fishPurchaseId:fishPurchaseId,
      userId:userId,
    }).then((res)=>{
      if(res.status == 400){
        setModalHandle('flex')
        setModalTitle(res.data.error);
        setM2(true);
      }else{
        setModalHandle('flex')
        setModalTitle(res.data.message);
        setM2(true);
      }
    }).catch((err)=>{
      console.log(err);
    })
}

  const modalFunc = () => {
    setModalHandle('none');
  };

  return (
    <>
      <div
        style={{ display: modalHandle }}
        className="absolute bg-[#7e0beb69] z-50 top-0 left-0 w-full h-screen flex justify-center items-center"
      >
        <div
          style={{ border: '4px solid #111' }}
          className="w-[320px] backdrop-blur-[30px] flex flex-col p-10 justify-center items-center h-[320px] rounded-xl bg-[#93cae07f]"
        >
          {!m2 ? (
            <h2 className="text-xl text-white font-bold  text-center ">
              {modalTitle} {farmPrice}
            </h2>
          ) : (
            <h2 className="text-xl text-white font-bold  text-center ">
              {modalTitle}
            </h2>
          )}
          {!m2 ? (
            <div className="w-full flex justify-between items-center h-[50px]">
              <button
                onClick={modalFunc}
                className="bg-black py-3 px-8 mt-5 rounded-xl text-white mr-1  font-black"
              >
                Cancel
              </button>
              <button
                onClick={purchaseHandler}
                className="bg-black ml-1 py-3 px-8 mt-5 rounded-xl text-white  font-black"
              >
                Confirm
              </button>
            </div>
          ) : (
            <button
              onClick={modalFunc}
              className="bg-black py-3 px-8 mt-2 rounded-xl text-white  font-black"
            >
              Okay
            </button>
          )}
        </div>
      </div>

      {user?.userId ? (
        <div className="home_component1">
          <div className="home_component  relative min-h-screen flex flex-col items-center justify-end">
            <div className="farm_nav flex-wrap absolute p-4 top-0 left-0 flex justify-center items-center">
              <button className="backdrop-blur-[70px] my-2 bg-[#040b0f9a] text-white font-black text-lg px-4 py-2 rounded-xl flex items-center">
                total farm {farm?.length}{' '}
                <img src="images/farm1.png" alt="feed" className="w-[35px] h-[35px] ml-2" />
              </button>
              <button className="backdrop-blur-[70px] my-1 bg-[#040b0f9a] text-white mx-2 font-black text-lg px-4 py-2 rounded-xl flex items-center">
                {' '}
                feeds bag 0 <img src="images/food.png" alt="feed" className="w-[35px] h-[35px] ml-2" />
              </button>
              <button
                onClick={() => setModalHandle('flex')}
                className="bg-black my-1 text-white cursor-pointer font-black text-xl px-4 py-2 rounded-xl"
              >
                Buy Chicken
              </button>
              <a
                href="/dashboard"
                className="bg-black my-1 ml-2 text-white cursor-pointer font-black text-xl px-4 py-2 rounded-xl"
              >
                Dashboard
              </a>
            </div>

            <div className=" bg-white   p-4 rounded-xl w-[350px]">
              <h3>
                you will have to feed your chicken daily and your chicken will lay egg 1% = 1 egg you will get daily 1%
                for 100 days
              </h3>
            </div>
            <div className="h-[400px] overflow-y-hidden  w-[390px] flex items-start justify-start ">
              <div className=" overflow-x-hidden flex-col farm_wrapper overflow-y-scroll h-[400px] w-[390px] flex items-start justify-start">
                {Array.isArray(farm) && farm.length > 0 ? (
                  farm.map((el, inx) => (
                    <div key={inx} className="my-[65px] relative">
                      <div className="chicken_farm my-5 flex items-center  justify-center  relative ">
                        <div className="absolute bg-[#880b17]  -top-[64px] z-10 p-2 rounded-xl w-[350px]">
                          <h2 className="text-md text-white font-black flex items-center">
                            total eggs laying from this farm{' '}
                            <img src="images/egg.png" alt="egg" className="w-[25px] h-[25px]" />{' '}
                            <span className="text-2xl font-black"> {el.earnings > 0 ? el.earnings.toFixed(0) : 0}</span>
                          </h2>
                        </div>

                        <div className="mt-190px] w-[390px] h-[220px] flex flex-col relative">
                          <img src="images/giphy.gif" alt="chicken" className="w-[200px] chicken_ absolute top-[40%] left-[15%] h-[200px] rounded-full" />
                          <img src="images/farm.png" alt="farm" className="farm_home ml-3 absolute -top-10 -left-10" />
                          {el.earningPaused === false ? (
                            <div className="w-[200px] h-12 flex justify-between items-center">
                              <button onClick={()=> Feed(el._id, el.userId)} className="bg-black absolute z-10  -bottom-[16px] rounded-xl w-[160px] text-white font-black px-6 py-2">Feed Chicken</button>
                              <button onClick={()=> buyFeed(el._id)} className="bg-red-600 absolute z-10 ml-[180px] -bottom-[16px] rounded-xl w-[160px] text-white font-black px-6 py-2">Buy Feed Bag</button>
                            </div>
                          ) : (
                            ''
                          )}

                          <button onClick={()=>claim(el._id, el.userId)} className="bg-black absolute z-10 left-[85px] -bottom-[66px] rounded-xl w-[210px] text-white font-black px-6 py-2">Sell your Eggs</button>
                        </div>
                      </div>
                     
                    </div>

                  ))
                ) : (
                  <div className="w-full flex justify-center items-center">
                      <button
                onClick={() => setModalHandle('flex')}
                className="bg-black my-1 mt-11 text-white cursor-pointer font-black text-xl px-4 py-2 rounded-xl"
              >
                Buy Chicken
              </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default contact;
