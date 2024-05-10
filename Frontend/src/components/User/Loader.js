import React from 'react'
import "../css/Homepage.css"
import { FaCar, FaFrog, FaMotorcycle, FaWalking } from 'react-icons/fa'
const Loader = () => {
  return (
    <div className='loader'>
      <div className='loader-con'>
              <div className='icon'>
                    </div>
              <div className='load-con'>
           <div className="spinner-grow   text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow  text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow  text-success" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow  text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
            </div>

            
             </div>
    </div>
  )
}

export default Loader