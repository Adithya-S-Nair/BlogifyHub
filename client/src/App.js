import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//CSS
import 'mdb-ui-kit/css/mdb.min.css';
import './App.css';

//Pages & Components
import Homepage from './Pages/Homepage'
import Authpage from './Pages/Authpage'
import Createpage from './Pages/Createpage';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/auth' element={<Authpage />} />
          <Route exact path='/create' element={<Createpage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App