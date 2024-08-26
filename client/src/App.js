import './App.css';
import {useEffect} from 'react';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { SetPortFolioData } from './redux/rootSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Loader from './components/Loader/Loader';
import Login from './pages/Admin/Login';
import Contact from './pages/Contact/Contact';
function App() {
  const {loading,portfolioData} = useSelector(state=>state.root);
  const dispatch = useDispatch();
  const getPortFolioData = async() => {
    try{
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/get-portfolio-data`);
      dispatch(SetPortFolioData(response.data));
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    getPortFolioData()
  }, []);

  useEffect(()=>{
    console.log(portfolioData);
  },[portfolioData])
  return (
    <BrowserRouter>
     {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact isContact = {true} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-login" element={<Login />} />

        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App;
