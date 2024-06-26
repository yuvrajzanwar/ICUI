import { useState } from 'react'
import './App.css'
import PP from "./components/particles"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./components/Home"
import About from "./components/About"
// import Homepage from './components/Homepage'
function App() {
    return (
    <>
      {/* <PP></PP> */}
      <Router>
        <Routes>
          {/* <Route path="/" element={<Homepage/>}/> */}
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
