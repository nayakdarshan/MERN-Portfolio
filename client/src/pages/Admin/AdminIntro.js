import { Form,Input, message } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, SetPortFolioData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';
import apiUrl from '../../config';
function AdminIntro() {
  const dispatch = useDispatch();
    const {portfolioData} = useSelector((state)=>state.root);
    console.log("PORTFOLIO DATA", portfolioData);

    const onFinish = async (values) =>{
      try {
        dispatch(ShowLoading());
        const response = await axios.post(`${apiUrl}/update-intro`,{
          ...values,
          _id:portfolioData.intro._id,
        });
        dispatch(HideLoading());
        if(response.data.success){
          dispatch(SetPortFolioData({ intro: response.data.data }));
          message.success(response.data.message);
        }else{
          message.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    }
  return (
    <div>
      <Form layout='vertical' onFinish={onFinish} initialValues={portfolioData.intro}>
        <Form.Item name='welcomeText' label="Enter Welcome Text">
            <Input placeholder='Welcome Text' />
        </Form.Item>

        <Form.Item name='caption' label="Enter Caption">
            <Input placeholder='Caption' />
        </Form.Item>

        <Form.Item name='description' label="Enter Description">
            <Input.TextArea placeholder='Description' style={{minHeight:'150px'}} />
        </Form.Item>
        <div className='d-flex justify-content-end'>
            <button className='px-5 py-2 btn btn-success' type='submit'>Update</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminIntro
