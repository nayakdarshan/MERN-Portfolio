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
function App() {
  const {loading,portfolioData} = useSelector(state=>state.root);
  const dispatch = useDispatch();
  const getPortFolioData = async() => {
    try{
      const response = await axios.get('/api/v1/portfolio/get-portfolio-data');
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
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-login" element={<Login />} />

        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App;
