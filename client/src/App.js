import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//CSS
import 'mdb-ui-kit/css/mdb.min.css';
import './App.css';

//Pages & Components
import Homepage from './Pages/Homepage'
import Authpage from './Pages/Authpage'
import Createpage from './Pages/Createpage';
import ReadBlogPage from './Pages/ReadBlogPage';
import Profilepage from './Pages/Profilepage';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/auth' element={<Authpage />} />
          <Route exact path='/create' element={<Createpage />} />
          <Route exact path='/read/:id' element={<ReadBlogPage />} />
          <Route exact path='/profile' element={<Profilepage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App