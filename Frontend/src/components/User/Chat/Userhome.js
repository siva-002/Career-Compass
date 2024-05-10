import React from 'react'

// import "../../css/Userhomepage.css"
import { FaUserAlt } from 'react-icons/fa'
import userimg from "./image/profile.png"
const Userhome = () => {
  
  return (
    <div className='userhomepage'>
          {/* <h2><FaUserAlt className='icon'/> Profile</h2> */}
      <div className='content'>
    
        <div className='image'>
          <img src={userimg}/>
        </div>
        <div className='profiledata'>
          {/* <h3>User Details</h3> */}
          <form>
            <div>
          <label>Name</label>  <input type="text" name="name" className='form-control' />
          </div><div>
          <label>Email</label>   <input type="email" name="email" className='form-control' />
          </div>
          <div>
           <label>Department</label>
           <select  name="dept" className='' title='Department'>
                <option value=""></option>
                <option value="CSE">CSE</option>
                <option value="CIVIL">CIVIL</option>
                <option value="MECH">MECH</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
            </select>
            </div><div>
            <label>Year</label>
            <select name="year" title="Year">
              <option value=""></option>
              <option value="1st year">First Year</option>
              <option value="2nd year">Second Year</option>
              <option value="3rd year">Third Year</option>
              <option value="4th year">Fourth Year</option>
            </select>
            </div>
            <div>
              <button className='btn btn-warning'>Update Profile</button>
            </div>
          </form>
        </div>
        <div className='head d-none d-lg-block'>
            {/* <h1>Profile </h1> */}
        </div>
      </div>
     
    </div>
  )
}

export default Userhome