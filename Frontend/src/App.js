import React from 'react'
import Login from './components/Login'
import Home from "./components/Home"
import About from "./components/About"
import Register from './components/Register'
import Homepage from './components/User/Chat/Homepage'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import { Routes, Route ,Switch,useLocation} from 'react-router-dom'
import { UserLoginDataProvider } from './components/context/UserLoginContext'
import { UserRegisterDataProvider } from './components/context/UserRegisterContext'
import { UserDetailsProvider } from './components/context/UserDetails'
import Forgotpassword from './components/forgotpassword'
import Navbar from "./components/Navbar"
import UserNavbar from "./components/User/UserNavbar"
import Profile from './components/User/Home/Profile'
import AptitudeHome from './components/User/Aptitude/AptitudeHome'
import Testpage from './components/User/Aptitude/Testpage'
import { AptitudeContextProvider } from './components/context/Aptitude'
import Dashboard from './components/User/Home/Dashboard'
import Notfound from './components/Notfound'
import ForumDashboard from './components/User/Forum/ForumDashboard'
import { ForumContextProvider } from './components/context/Forumcontext'
import { AnimatePresence } from 'framer-motion'


const App = () => {
  const location=useLocation()
  return (
    <div>       
      <AnimatePresence>
        <Routes location={location} key={location.key}>
            <Route path="/" element={<><Navbar active={"home"}/><Home/></>}/>

      
            <Route path="/about" element={<><Navbar active={"about"}/><About/></>}/>
            <Route path="/signin" element={<><Navbar active={"signin"}/><UserLoginDataProvider><Login/></UserLoginDataProvider></>}></Route>
            <Route path="/signup" element={<><Navbar active={"signup"}/><UserRegisterDataProvider><Register/></UserRegisterDataProvider></>}></Route>
            <Route path="/forgotpassword" element={<Forgotpassword/>}></Route>
            <Route path="/user">
              <Route index element={<UserDetailsProvider><Dashboard/></UserDetailsProvider>}/>
              <Route path=":page" element={<UserDetailsProvider><Dashboard/></UserDetailsProvider>}/>
          
                             {/* <Route index element={<><UserDetailsProvider><Profile/></UserDetailsProvider></>}/> */}
                <Route path="chat">
                  <Route index element={<UserDetailsProvider><Homepage/></UserDetailsProvider>}/>
                  <Route path=":user_id" element={<UserDetailsProvider><Homepage/></UserDetailsProvider>} />
                 </Route> 
                 <Route path="aptitude/:page" element={<><UserDetailsProvider><AptitudeContextProvider><AptitudeHome/></AptitudeContextProvider> </UserDetailsProvider></>}/>
                 <Route path="aptitude/test/:id" element={<><UserDetailsProvider><AptitudeContextProvider><Testpage/></AptitudeContextProvider></UserDetailsProvider></>}/>
                 <Route path="forum">
                  <Route index element={<><ForumContextProvider><UserDetailsProvider><ForumDashboard/></UserDetailsProvider></ForumContextProvider></>} />
                  <Route path=":page" element={<><ForumContextProvider><UserDetailsProvider><ForumDashboard/></UserDetailsProvider></ForumContextProvider></>} />
                  </Route>
            </Route>
              
            <Route path="*" element={<><Notfound/></>} />
        </Routes>
  
        </AnimatePresence>
    </div>
  )
}

export default App