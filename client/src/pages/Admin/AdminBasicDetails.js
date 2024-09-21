import { Form, Input, DatePicker, message, Upload, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, SetPortFolioData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';
import apiUrl from '../../config';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

function AdminBasicDetails() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const basicData = portfolioData?.basicData || {};

  const [fileList, setFileList] = useState([]);
  const [isUploadDisabled, setIsUploadDisabled] = useState(false);

  useEffect(() => {
    if (basicData.profileImg) {
      setFileList([
        {
          uid: '-1',
          name: 'Current Profile Picture',
          status: 'done',
          url: basicData.profileImg,
        },
      ]);
      setIsUploadDisabled(true);
    }
  }, [basicData.profileImg]);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('dob', values.dob.format('YYYY-MM-DD'));
      formData.append('location', values.location);
      formData.append('_id', basicData._id);

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('profileImg', fileList[0].originFileObj);
      }

      const response = await axios.post(`${apiUrl}/update-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch(HideLoading());

      if (response.data.success) {
        dispatch(SetPortFolioData({ basicData: response.data.data }));
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.response?.data?.message || error.message);
    }
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    setIsUploadDisabled(fileList.length > 0);
  };

  const handleRemoveImage = () => {
    setFileList([]);
    setIsUploadDisabled(false);
  };

  if (!portfolioData || !portfolioData.basicData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Form
        layout='vertical'
        onFinish={onFinish}
        initialValues={{
          ...basicData,
          dob: basicData.dob ? moment(basicData.dob) : null,
        }}
      >
        <Form.Item
          label='Profile Picture'
        >
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              {fileList.length > 0 && (
                <img
                  src={fileList[0].url || URL.createObjectURL(fileList[0].originFileObj)}
                  alt="Profile"
                  style={{ width: '200px', height: '200px', objectFit: 'cover', marginRight: '10px' }}
                />
              )}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Upload
                  listType='picture'
                  beforeUpload={() => false}
                  fileList={fileList}
                  onChange={handleUploadChange}
                  maxCount={1}
                  showUploadList={false}
                  disabled={isUploadDisabled}
                >
                  <Button icon={<UploadOutlined />} disabled={isUploadDisabled}>
                    Click to Upload
                  </Button>
                </Upload>
                {isUploadDisabled && (
                  <Button
                    icon={<DeleteOutlined />}
                    type="danger"
                    onClick={handleRemoveImage}
                    style={{ marginTop: '10px' }}
                  >
                    Remove Image
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Form.Item>

        <Form.Item
          name='firstName'
          label='First Name'
          rules={[{ required: true, message: 'First name is required' }]}
        >
          <Input placeholder='First Name' />
        </Form.Item>

        <Form.Item
          name='lastName'
          label='Last Name'
          rules={[{ required: true, message: 'Last name is required' }]}
        >
          <Input placeholder='Last Name' />
        </Form.Item>

        <Form.Item
          name='dob'
          label='Date of Birth'
          rules={[{ required: true, message: 'Date of birth is required' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name='location'
          label='Location'
          rules={[{ required: true, message: 'Location is required' }]}
        >
          <Input placeholder='Location' />
        </Form.Item>

        <div className='d-flex justify-content-end'>
          <button className='px-5 py-2 btn btn-success' type='submit'>
            Update
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminBasicDetails;
