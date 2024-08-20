import React, { useCallback, useEffect, useState } from 'react'
import { Layout, Tabs } from 'antd';
import AdminIntro from './AdminIntro';
import { useSelector } from 'react-redux';
import AdminAbout from './AdminAbout';
const { Header, Content, Footer } = Layout;

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: 'Intro Section',
    children: <AdminIntro />,
  },
  {
    key: '2',
    label: 'About Section',
    children: <AdminAbout/>,
  },
  
];

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/admin-login'
}

function Admin() {
  const [selectedKey, setSelectedKey] = useState('1');
  const {portfolioData} = useSelector((state)=>state.root);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (portfolioData) {
      setSelectedKey('1'); 
    }
  }, [portfolioData]);
  const handleTabChange = useCallback((key) => {
    setSelectedKey(key);
  }, []);

  useEffect(() => {
    if(!localStorage.getItem('token')){
      window.location.href = '/admin-login'
    }
  },[]);
  return (
    (portfolioData && (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="admin-header">
          <div className="admin-header-content text-center">
            <h5>Admin Dashboard - Portfolio</h5>
          </div>
          <div>
            <button className='btn btn-danger' onClick={logout}>Logout</button>
          </div>
        </Header>
        <Layout>
          <Content style={{ padding: '0 50px', marginTop: 30,marginBottom:30 }}>
            <div className="container">
                <Tabs
                  defaultActiveKey={selectedKey}
                  items={items}
                  onChange={handleTabChange}
                  tabPosition="left"
                />
            </div>
          </Content>
          <Footer className='admin-footer'>
            Admin Dashboard ©{currentYear} Created by Darshan Nayak
          </Footer>
        </Layout>
      </Layout>
    ))
  );
}
export default Admin
