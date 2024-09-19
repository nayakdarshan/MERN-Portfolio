import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Modal, Form, Input, Slider, Progress, message } from 'antd';
import { ShowLoading, HideLoading, SetPortFolioData } from '../../redux/rootSlice';
import axios from 'axios';
import apiUrl from '../../config';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminSkills() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [form] = Form.useForm();

  const showModal = (skill = null) => {
    setCurrentSkill(skill);
    setIsEditing(!!skill);
    setIsModalVisible(true);
    if (skill) {
      form.setFieldsValue(skill);
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentSkill(null);
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (isEditing) {
        response = await axios.post(`${apiUrl}/update-skill`, {
          ...values,
          _id: currentSkill._id,
        });
      } else {
        response = await axios.post(`${apiUrl}/add-skill`, values);
      }

      dispatch(HideLoading());
      if (response.data.success) {
        dispatch(SetPortFolioData({ skills: response.data.data }));
        message.success(response.data.message);
        setIsModalVisible(false);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteSkill = (skillId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this skill?',
      onOk: async () => {
        try {
          dispatch(ShowLoading());
          const response = await axios.post(`${apiUrl}/delete-skill`, { _id: skillId });
          dispatch(HideLoading());
          if (response.data.success) {
            dispatch(SetPortFolioData({ skills: response.data.data }));
            message.success(response.data.message);
          } else {
            message.error(response.data.message);
          }
        } catch (error) {
          dispatch(HideLoading());
          message.error(error.message);
        }
      },
    });
  };

  return (
    <div>
      <div className='d-flex justify-content-end mb-3'>
        <Button className='btn btn-primary' onClick={() => showModal()}>
          Add Skill
        </Button>
      </div>
      <div className='container'>
        <div className='row'>
          {portfolioData.skills?.map((skill) => (
            <div key={skill._id} className='col-md-4 mb-4'>
              <Card className='h-100'>
                <img
                  src={skill.image}
                  alt={skill.name}
                  className='card-img-top'
                  style={{ height: '150px', objectFit: 'cover' }}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{skill.name}</h5>
                  <Progress percent={skill.level} />
                  <div className='d-flex justify-content-between mt-3'>
                    <Button
                      className='btn btn-primary'
                      onClick={() => showModal(skill)}
                    >
                      Update
                    </Button>
                    <Button
                      className='btn btn-danger'
                      onClick={() => deleteSkill(skill._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Modal
        title={isEditing ? 'Update Skill' : 'Add Skill'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
        >
          <Form.Item
            name='name'
            label='Skill Name'
            rules={[{ required: true, message: 'Please enter the skill name' }]}
          >
            <Input placeholder='Enter skill name' />
          </Form.Item>
          <Form.Item
            name='image'
            label='Skill Image URL'
            rules={[{ required: true, message: 'Please enter the skill image URL' }]}
          >
            <Input placeholder='Enter skill image URL' />
          </Form.Item>
          <Form.Item
            name='level'
            label='Skill Level'
            rules={[{ required: true, message: 'Please set the skill level' }]}
          >
            <Slider min={0} max={100} />
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <Button className='btn btn-primary' htmlType='submit'>
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminSkills;
