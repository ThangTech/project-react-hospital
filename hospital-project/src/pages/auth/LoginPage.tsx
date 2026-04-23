import { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input} from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import backgroundImg from '../../assets/background.jpg';
import { getAccount, loginAccount } from '../../services/api.auth.service';
import { useAuth } from '../../hooks/useAuth';

type LoginFormValues = {
  TenDangNhap: string;
  MatKhau: string;
  remember?: boolean;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      const res = await loginAccount({
        TenDangNhap: values.TenDangNhap,
        MatKhau: values.MatKhau,
      });
  
      const token = res.data?.token;
      if (token) {

        localStorage.setItem('token', token);

        const meRes = await getAccount();
        const userData = meRes.data;
        login(token, userData);

        // Điều hướng theo role
        const role = userData.vaiTro;
        if (role === 'Admin') {
          navigate('/dashboard/admin');
        } else if (role === 'BacSi') {
          navigate('/dashboard/doctor');
        } else if (role === 'YTa') {
          navigate('/dashboard/nurse');
        } else if (role === 'KeToan') {
          navigate('/dashboard/accountant');
        } else {
          navigate('/');
        }

      }
    } catch {

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      <div
        className="hidden md:flex flex-1 flex-col justify-end p-10 relative"
        style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,61,98,0.92) 30%, rgba(10,61,98,0.3) 100%)' }} />
        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs"
            style={{ background: 'rgba(255,255,255,0.12)', border: '0.5px solid rgba(255,255,255,0.25)', color: '#a8d8ea' }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#a8d8ea" strokeWidth="1.5">
              <path d="M8 2L3 4.5V9c0 2.8 2.2 4.8 5 5.5 2.8-.7 5-2.7 5-5.5V4.5L8 2z" />
            </svg>
            Được chứng nhận Bộ Y tế
          </div>
          <h1
            className="text-white text-3xl font-semibold leading-snug mb-3"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Hãy tin tưởng<br />vào chúng tôi
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Đội ngũ y bác sĩ giàu kinh nghiệm,<br />luôn đồng hành cùng sức khỏe của bạn.
          </p>
        </div>
      </div>

      <div className="w-full md:w-120 bg-white flex flex-col justify-center px-8 py-10">
        <div className="flex items-center gap-2 mb-8">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: '#0a3d62' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
              <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-800">Bệnh viện Đa khoa</div>
            <div className="text-xs text-gray-400">Hệ thống quản lý nội bộ</div>
          </div>
        </div>

        <h2 className="text-xl font-medium text-gray-800 mb-1">Đăng nhập</h2>
        <p className="text-sm text-gray-400 mb-6">Chào mừng trở lại, vui lòng đăng nhập</p>

        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            name="TenDangNhap"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" size="middle" />
          </Form.Item>

          <Form.Item
            name="MatKhau"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="middle" />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
              <Link to="/forgot-password" className="text-xs" style={{ color: '#185FA5' }}>
                Quên mật khẩu?
              </Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button
              block
              htmlType="submit"
              loading={loading}
              style={{ background: '#0a3d62', borderColor: '#0a3d62', color: '#fff', fontWeight: 500 }}
            >
              Đăng nhập
            </Button>
            <div className="text-center mt-3 text-xs text-gray-400">
              hoặc{' '}
              <Link to="/register" style={{ color: '#185FA5' }}>
                Yêu cầu tạo tài khoản
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;