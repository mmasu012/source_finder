import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Homepage from './components/HomePage';
import './App.scss';
import Footer from './components/Footer';
import Dataset from './components/Dataset';

function App() {
  return (<div>

    <Router>
      <Header />
      <div className='container page-wrap'>
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/home" element={<Homepage />} exact />
          <Route path="/dataset" element={<Dataset />} exact />
        </Routes>
      </div>
      <Footer />

    </Router>
  </div>);
}
export default App;