import './App.scss';
// import Particles from 'react-particles';
// import { loadFull } from 'tsparticles';
import About from './containers/About';
import Home from './containers/Home';
import { Routes, Route } from 'react-router-dom'
// import { Routes, Route, useLocation } from 'react-router-dom'
import Skills from './containers/Skills';
import Resume from './containers/Resume';
import Portfolio from './containers/Portfolio';
import Contact from './containers/Contact';
import Navbar from './components/navBar';
// import particles from "./utils.js/particles";
import Certificate from './containers/Certificate';

export default function App() {

  // const location = useLocation();
  // const handleInit = async(main)=>{
  //   await loadFull(main);
  // };

  // const renderParticleJsIsHomePage = location.pathname === "/";

  return (
    <div className='App'>
      {/* particles js */}
      {/* {renderParticleJsIsHomePage && <Particles id='particles' options={particles} init={handleInit}/>} */}


      {/* navbar */}
      <Navbar/>


      {/* main page content */}
      <div className='App__main-page-content'>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Skills' element={<Skills/>}/>
        <Route path='/Certificate' element={<Certificate/>}/>
        <Route path='/Resume' element={<Resume/>}/>
        <Route path='/Portfolio' element={<Portfolio/>}/>
        <Route path='/Contact' element={<Contact/>}/>
      </Routes>
      </div>
      
    </div>
  );
}

