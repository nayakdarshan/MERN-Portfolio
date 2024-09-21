import { Form, Input, message } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, SetPortFolioData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';
import apiUrl from '../../config';

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData, isGuest } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(`${apiUrl}/update-about`, {
        ...values,
        _id: portfolioData.about._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        dispatch(SetPortFolioData({ about: response.data.data }));
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <Form layout='vertical' onFinish={onFinish} initialValues={portfolioData.about}>
        <Form.Item name='header' label="Enter About Header">
          <Input placeholder='About Header' disabled={isGuest} />
        </Form.Item>

        <Form.Item name='description1' label="Enter First Description">
          <Input.TextArea placeholder='First Description' style={{ minHeight: '150px' }} disabled={isGuest} />
        </Form.Item>

        <Form.Item name='description2' label="Enter Second Description">
          <Input.TextArea placeholder='Second Description' style={{ minHeight: '150px' }} disabled={isGuest} />
        </Form.Item>
        
        <div className='d-flex justify-content-end'>
          <button className='px-5 py-2 btn btn-success' type='submit' disabled={isGuest}>Update</button>
        </div>
      </Form>
    </div>
  );
}

export default AdminAbout;
