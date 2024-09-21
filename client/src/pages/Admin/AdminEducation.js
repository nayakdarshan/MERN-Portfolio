import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Modal, Form, DatePicker, Checkbox, message, Spin, Input } from 'antd';
import { ShowLoading, HideLoading, SetPortFolioData } from '../../redux/rootSlice'; 
import axios from 'axios';
import apiUrl from '../../config';
import moment from 'moment';

const { RangePicker } = DatePicker;

function AdminEducation() {
  const dispatch = useDispatch();
  const { portfolioData, isGuest } = useSelector((state) => state.root);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEducation, setCurrentEducation] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const showModal = (education = null) => {
    setCurrentEducation(education);
    setIsEditing(!!education);
    setIsModalVisible(true);
    if (education) {
      form.setFieldsValue({
        ...education,
        current: education.current || false,
        fromDate: moment(education.fromDate),
        toDate: education.current ? null : moment(education.toDate),
      });
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentEducation(null);
  };

  const onFinish = async (values) => {
    if (isGuest) return; 

    try {
      setLoading(true);
      dispatch(ShowLoading());
      let response;
      const { fromDate, toDate, current, ...rest } = values;
      const toDateValue = current ? 'Present' : toDate;

      if (isEditing) {
        response = await axios.post(`${apiUrl}/update-education`, {
          ...rest,
          fromDate: fromDate.format('YYYY-MM-DD'),
          toDate: toDateValue,
          _id: currentEducation._id,
        });
      } else {
        response = await axios.post(`${apiUrl}/add-education`, {
          ...rest,
          fromDate: fromDate.format('YYYY-MM-DD'),
          toDate: toDateValue,
        });
      }

      if (response.data.success) {
        dispatch(SetPortFolioData({ education: response.data.data }));
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
      dispatch(HideLoading());
      setIsModalVisible(false);
    }
  };

  const deleteEducation = (educationId) => {
    if (isGuest) {
      message.error('Guest users cannot delete education entries.');
      return;
    }

    Modal.confirm({
      title: 'Are you sure you want to delete this education?',
      onOk: async () => {
        try {
          setLoading(true);
          dispatch(ShowLoading());
          const response = await axios.post(`${apiUrl}/delete-education`, { _id: educationId });
          if (response.data.success) {
            dispatch(SetPortFolioData({ education: response.data.data }));
            message.success(response.data.message);
          } else {
            message.error(response.data.message);
          }
        } catch (error) {
          message.error(error.response?.data?.message || error.message);
        } finally {
          setLoading(false);
          dispatch(HideLoading());
        }
      },
    });
  };

  const handleCurrentChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      form.setFieldsValue({ toDate: null });
    } else {
      form.setFieldsValue({ toDate: '' });
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-end mb-3'>
        <Button className='btn btn-primary' onClick={() => showModal()} disabled={isGuest}>
          Add Education
        </Button>
      </div>
      <div className='container'>
        {portfolioData.education?.map((education) => (
          <Card key={education._id} className='mb-4'>
            <div>
              <h5>{education.instituteName}</h5>
              <p>{education.fromDate} - {education.current ? 'Present' : education.toDate}</p>
              <p>{education.description}</p>
              <p>Grade: {education.grade || 'N/A'}</p>
              <p>Location: {education.location}</p>
              <div className='d-flex justify-content-between'>
                <Button className='btn btn-primary' onClick={() => showModal(education)} disabled={isGuest}>
                  Update
                </Button>
                <Button className='btn btn-danger' onClick={() => deleteEducation(education._id)} disabled={isGuest}>
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        title={isEditing ? 'Update Education' : 'Add Education'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Spin spinning={loading}>
          <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
          >
            <Form.Item
              name='instituteName'
              label='Institute Name'
              rules={[{ required: true, message: 'Please enter the institute name' }]}
            >
              <Input placeholder='Enter institute name' disabled={isGuest} />
            </Form.Item>
            <Form.Item
              name='fromDate'
              label='From Date'
              rules={[{ required: true, message: 'Please select the start date' }]}
            >
              <DatePicker placeholder='Select start date' style={{ width: '100%' }} disabled={isGuest} />
            </Form.Item>
            <Form.Item
              name='toDate'
              label='To Date'
            >
              <DatePicker placeholder='Select end date' style={{ width: '100%' }} disabled={form.getFieldValue('current') || isGuest} />
            </Form.Item>
            <Form.Item
              name='current'
              valuePropName='checked'
              onChange={handleCurrentChange}
            >
              <Checkbox disabled={isGuest}>Currently enrolled</Checkbox>
            </Form.Item>
            <Form.Item
              name='description'
              label='Description'
              rules={[{ required: true, message: 'Please enter a description' }]}
            >
              <Input.TextArea placeholder='Enter description' disabled={isGuest} />
            </Form.Item>
            <Form.Item
              name='grade'
              label='Grade'
            >
              <Input placeholder='Enter grade (optional)' disabled={isGuest} />
            </Form.Item>
            <Form.Item
              name='location'
              label='Location'
              rules={[{ required: true, message: 'Please enter the location' }]}
            >
              <Input placeholder='Enter location' disabled={isGuest} />
            </Form.Item>
            <div className='d-flex justify-content-end'>
              <Button className='btn btn-primary' htmlType='submit' loading={loading} disabled={isGuest}>
                {isEditing ? 'Update' : 'Add'}
              </Button>
            </div>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
}

export default AdminEducation;
