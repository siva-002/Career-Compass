import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, { useContext ,useEffect} from 'react'
import UserDetailsContext from '../../context/UserDetails'

const Searchbar = ({setsearch,id,setfilterprofession,filterprofession}) => {
 
  return (
    <div className='search-bar' >
    <div className='input-group form-control'>
       <label htmlFor=""> <FontAwesomeIcon icon={faSearch} className='icon'/></label> 
        <input id={id} type='text' className='' placeholder='Search by Name or Area Of Interest' onChange={(e)=>setsearch(e.target.value)}/>
    </div>
  
    <div>
      <select className='form-control' onChange={(e)=>setfilterprofession(e.target.value)}>
           <option value="">none</option>
           <option value="student">Student</option>
            <option value="teaching staff">Teaching Staff</option>
            <option value="worker">Worker</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="freelancer">Freelancer</option>
            <option value="unemployed">Unemployed</option>
            <option value="others">Others</option>
      </select>
    </div>
    </div>
  )
}

export default Searchbar