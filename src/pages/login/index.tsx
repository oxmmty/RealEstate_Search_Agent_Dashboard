import type { LoginParams } from '@/interface/user/login';
import { type FC } from 'react';

import './index.less';

import { Button, Checkbox, Form, Input, theme as antTheme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import logo from '@/assets/icons/logo.png';

import { loginAsync } from '../../stores/user.action';

const initialValues: LoginParams = {
  username: '',
  password: '',
  // remember: true
};

const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const { logged } = useSelector(state => state.user);

  const onFinished = (form: LoginParams) => {
    dispatch(loginAsync({...form}));
  };

  return logged ? <Navigate to="/home" /> : (
    <div className="login-page" style={{ backgroundColor: '#1b2635' }}>
      <Form<LoginParams> onFinish={onFinished} initialValues={initialValues}>
        <img src={logo} style={{ display: 'block', width: '90px', margin: 'auto'}}/>
        <h2 style={{ textAlign: 'center', marginTop: 0, color: '#fffffff2' }}>Welcome!</h2>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "User Email is required",
              },
            ]}
          >
            <Input
              className='w-full'
              placeholder="Enter User Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}
          >
            <Input
              className='w-full'
              type="password"
              placeholder="Enter Password"
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>
              Remember user
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" className="login-page-form_button">
              Login
            </Button>
          </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
