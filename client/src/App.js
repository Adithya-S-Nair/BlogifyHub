import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//CSS
import 'mdb-ui-kit/css/mdb.min.css';
import './App.css';

//Pages & Components
import Homepage from './Pages/Homepage'
import Authpage from './Pages/Authpage'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/auth' element={<Authpage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App