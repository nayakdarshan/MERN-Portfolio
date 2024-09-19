import { Form, Input, Button, message, Slider } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, SetPortFolioData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';
import apiUrl from '../../config';

function AdminSkills() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(`${apiUrl}/update-skills`, {
        skills: values.skills,
      });
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
  };

  return (
    <div>
      <Form
        layout='vertical'
        onFinish={onFinish}
        initialValues={{ skills: portfolioData.skills || [] }} // Pre-fill with existing skills
      >
        <Form.List name='skills'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className='skill-item'>
                  <h4>Skill {key + 1}</h4>
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    label='Skill Name'
                    rules={[{ required: true, message: 'Please enter the skill name' }]}
                  >
                    <Input placeholder='Enter skill name' />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'image']}
                    label='Skill Image URL'
                    rules={[{ required: true, message: 'Please enter the skill image URL' }]}
                  >
                    <Input placeholder='Enter skill image URL' />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'level']}
                    label='Skill Level'
                    rules={[{ required: true, message: 'Please set the skill level' }]}
                  >
                    <Slider min={0} max={100} />
                  </Form.Item>

                  <Button type='danger' onClick={() => remove(name)} style={{ marginBottom: 16 }}>
                    Remove Skill
                  </Button>

                  <hr />
                </div>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} block>
                  Add Skill
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <div className='d-flex justify-content-end'>
          <Button type='primary' htmlType='submit' className='px-5 py-2'>
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AdminSkills;
