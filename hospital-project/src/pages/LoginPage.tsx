import { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api.auth.service';

type LoginFormValues = {
  TenDangNhap: string;
  MatKhau: string;
  remember?: boolean;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      const res = await authService.login({
        TenDangNhap: values.TenDangNhap,
        MatKhau: values.MatKhau,
      });
      const token = res.data?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/dashboard');
      }
    } catch {
      // message lỗi sẽ xử lý sau
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Đăng nhập</h2>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="TenDangNhap"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item
            name="MatKhau"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
              <a href="/forgot-password">Quên mật khẩu?</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loading}>
              Đăng nhập
            </Button>
            <div className="text-center mt-2 text-sm">
              hoặc <a href="/register">Yêu cầu tạo tài khoản</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;