import React, { useContext } from 'react'
import Apicon from '../Api/Apicon'
import UserDetailsContext from '../context/UserDetails'
const Authverify = async(setsessionexpiry,setloginload) => {
    const token=sessionStorage.getItem('user_token')    
    const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({"token":token})}     
    const response=await Apicon('User',options)
    if(response.status==200){
        setsessionexpiry(false)
    }else {
        setsessionexpiry(true)
    }
    // setloginload(false)
   
}

export default Authverify