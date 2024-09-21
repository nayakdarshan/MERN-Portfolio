import React, { useCallback, useEffect, useState } from 'react';
import { Layout, Tabs, Grid, Button } from 'antd';
import AdminIntro from './AdminIntro';
import { useSelector } from 'react-redux';
import AdminAbout from './AdminAbout';
import AdminSkills from './AdminSkills';
import AdminEducation from './AdminEducation';
import AdminBasicDetails from './AdminBasicDetails';

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const items = [
  {
    key: '1',
    label: 'Profile Section',
    children: <AdminBasicDetails />,
  },
  {
    key: '2',
    label: 'Intro Section',
    children: <AdminIntro />,
  },
  {
    key: '3',
    label: 'About Section',
    children: <AdminAbout />,
  },
  {
    key: '4',
    label: 'Skills Section',
    children: <AdminSkills />,
  },
  {
    key: '5',
    label: 'Education Section',
    children: <AdminEducation />,
  },
];

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/admin-login';
};

function Admin() {
  const [selectedKey, setSelectedKey] = useState('1');
  const { portfolioData } = useSelector((state) => state.root);
  const currentYear = new Date().getFullYear();
  const screens = useBreakpoint();
  
  useEffect(() => {
    if (portfolioData) {
      setSelectedKey('1');
    }
  }, [portfolioData]);

  const handleTabChange = useCallback((key) => {
    setSelectedKey(key);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/admin-login';
    }
  }, []);

  return (
    portfolioData && (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="admin-header">
          <div className="admin-header-content"><h5>Admin Dashboard - Portfolio</h5></div>
          <div><Button className="d-flex align-items-center btn btn-danger" onClick={logout}>Logout</Button></div>
        </Header>
        <Layout>
          <Content style={{ padding: screens.xs ? '0 20px' : '0 50px', marginTop: 30, marginBottom: 30 }}>
            <div className="container">
              <Tabs
                defaultActiveKey={selectedKey}
                items={items}
                onChange={handleTabChange}
                tabPosition={screens.md ? 'left' : 'top'} 
              />
            </div>
          </Content>
          <Footer className="admin-footer" style={{ textAlign: 'center' }}>
            Admin Dashboard ©{currentYear} Created by Darshan Nayak
          </Footer>
        </Layout>
      </Layout>
    )
  );
}

export default Admin;
