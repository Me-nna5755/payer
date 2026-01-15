


import React, { useEffect, useState } from 'react';
import  Paryer from './paryer'
import './App.css';

function App() {


  const[paryerTimes , setparyerTimes] = useState({});
  const[dataTime , setDataTime] = useState("");
    const[city , setCity] = useState("cairo");
    
const cities = [
  { name: 'القاهرة', value: 'cairo' },
  { name: 'الإسكندرية', value: 'alexandria' },
  { name: 'الجيزة', value: 'giza' },
  { name: 'القليوبية', value: 'qalyubia' },
  { name: 'بورسعيد', value: 'port-said' },
  { name: 'السويس', value: 'suez' },
  { name: 'الغربية', value: 'gharbia' },
  { name: 'الدقهلية', value: 'dakahlia' },
  { name: 'المنوفية', value: 'monufia' },
  { name: 'الشرقية', value: 'sharqia' },
  { name: 'البحيرة', value: 'beheira' },
  { name: 'كفر الشيخ', value: 'kafr-el-sheikh' },
  { name: 'الفيوم', value: 'fayoum' },
  { name: 'بني سويف', value: 'beni-suef' },
  { name: 'المنيا', value: 'minya' },
  { name: 'أسيوط', value: 'assyut' },
  { name: 'سوهاج', value: 'sohag' },
  { name: 'قنا', value: 'qena' },
  { name: 'الأقصر', value: 'luxor' },
  { name: 'أسوان', value: 'aswan' },
  { name: 'البحر الأحمر', value: 'red-sea' },
  { name: 'الوادي الجديد', value: 'new-valley' },
  { name: 'مطروح', value: 'matrouh' },
  { name: 'شمال سيناء', value: 'north-sinai' },
  { name: 'جنوب سيناء', value: 'south-sinai' },
  { name: 'الإسماعيلية', value: 'ismailia' }
];


console.log(city);


useEffect(() => {
  const fetchParyerTimes = async () => {
    try {
      const response = await fetch('https://api.aladhan.com/v1/timingsByCity?city=' + city + '&country=Egypt&method=5=');
      const dataParyer = await response.json();
      console.log(dataParyer);
      
      // هنا يجب أن تضع بيانات الصلاة في state لتتمكن من استخدامها في الـ Return
      // مثال: setTimings(dataParyer.data.timings); 
      setparyerTimes(dataParyer.data.timings)
      setDataTime(dataParyer.data.date.gregorian.date)
     
    } catch (error) {
      console.error(error);
    }
  };

  fetchParyerTimes(); // استدعاء الدالة بدون تمرير أي شيء لها
}, [city]);


const formatTimes = (time) => {
  if (!time) {
    return "00:00";
  }

  // تقسيم الوقت إلى ساعات ودقائق
  let [hours, minutes] = time.split(":").map(Number);

  // تحديد هل هو صباحاً أم مساءً
  const period = hours >= 12 ? " PM" : " AM";

  // تحويل نظام 24 ساعة إلى 12 ساعة
  hours = hours % 12 || 12;
   return`${hours} : ${minutes < 10 ?"0" + minutes: minutes} ${period}`
};








  return (
    <section>
     {/*////////////// /////////////////////////////////// */}
        <div className="main">

        <div className="contenir">
          <h1 className='title'> مواقيت الصلاة في مصر</h1>
          <div className="top-sec">

              <div className="cites">
            <h4>المدينه</h4>
             <select name="" id=""  onChange={(e)=>setCity(e.target.value )}>
             {cities.map((cityobj)=>(
              <option key={cityobj.value}  value={cityobj.value} > {cityobj.name} </option>
             ))}
             </select>
             </div>
           
           <div className="date">
            <h4>التاريخ</h4>
            <h4> {dataTime}  </h4>
           </div>

          </div>
  {/* //////////////////////////////////////////////// */}
          <div className="bottom-sec">
                <Paryer name="الفجر"  time= {formatTimes(paryerTimes.Fajr)}  />
               <Paryer name="الظهر"  time={formatTimes(paryerTimes.Dhuhr)}  />
               <Paryer name="العصر"  time={formatTimes(paryerTimes.Asr)}  />
               <Paryer name="المغرب"  time={formatTimes(paryerTimes.Maghrib)}  />
               <Paryer name="العشاء"  time={formatTimes(paryerTimes.Isha)}  />
               
               
          </div>



       </div>
        </div>
    </section>

  );
}

export default App;