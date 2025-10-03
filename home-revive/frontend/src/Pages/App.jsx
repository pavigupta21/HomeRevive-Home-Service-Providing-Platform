import React from 'react'
import {Home} from './Home.jsx'
import {Login} from './Login.jsx'
import {Signup} from './Signup.jsx'
import { About } from './About.jsx';
import { Rewards } from './Rewards.jsx';
import { Reviews } from './Reviews.jsx';
import { ServiceHistory } from './ServiceHistory.jsx';
import {Routes, Route} from 'react-router-dom';
import { Services } from './Services.jsx';
import {BookingDetails} from './BookingDetails.jsx';
import {BookSlot} from './BookSlot.jsx';
import BackgroundAudio from '../components/BackgroundAudio.jsx';
import '../index.css'

function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/aboutus" element={<About />} />
      <Route path="/rewards" element={<Rewards />} />  
      <Route path="/reviews" element={<Reviews />} />  
      <Route path="/servicehistory" element={<ServiceHistory />} />
      <Route path="/services" element={<Services />} />
       <Route path="/services/:subName" element={<BookingDetails />} />
       <Route path="/services/:subName/book/:subName/slot" element={< BookSlot/>} />
      </Routes>
      <BackgroundAudio />
    </>
  )
}

export default App
