import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../../assets/background.jpg";
import { changePassword } from "../../services/api.auth.service";

type ChangePasswordFormValues = {
  MatKhauCu: string;
  MatKhauMoi: string;
  XacNhanMatKhauMoi: string;
};

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<ChangePasswordFormValues>();

  const onFinish = async (values: ChangePasswordFormValues) => {
    setLoading(true);
    try {
      await changePassword({
        MatKhauCu: values.MatKhauCu,
        MatKhauMoi: values.MatKhauMoi,
      });
      message.success("Đổi mật khẩu thành công");
      form.resetFields();
      navigate("/login");
    } catch (error: any) {
      const msg = error?.response?.data?.message ?? error?.message ?? "Đổi mật khẩu thất bại";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      <div
        className="hidden md:flex flex-1 flex-col justify-end p-10 relative"
        style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,61,98,0.92) 30%, rgba(10,61,98,0.3) 100%)" }} />
        <div className="relative z-10">
          <h1 className="text-white text-3xl font-semibold leading-snug mb-3" style={{ fontFamily: "Georgia, serif" }}>
            Đổi mật khẩu
            <br />
an toàn
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Cập nhật mật khẩu để bảo vệ tài khoản nội bộ của bạn.
          </p>
        </div>
      </div>

      <div className="w-full md:w-120 bg-white flex flex-col justify-center px-8 py-10">
        <h2 className="text-xl font-medium text-gray-800 mb-1">Đổi mật khẩu</h2>
        <p className="text-sm text-gray-400 mb-6">Nhập mật khẩu cũ và mật khẩu mới</p>

        <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish}>
          <Form.Item
            name="MatKhauCu"
            label="Mật khẩu cũ"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu cũ" />
          </Form.Item>

          <Form.Item
            name="MatKhauMoi"
            label="Mật khẩu mới"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }, { min: 6, message: "Tối thiểu 6 ký tự" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Tối thiểu 6 ký tự" />
          </Form.Item>

          <Form.Item
            name="XacNhanMatKhauMoi"
            label="Xác nhận mật khẩu mới"
            dependencies={["MatKhauMoi"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("MatKhauMoi") === value) return Promise.resolve();
                  return Promise.reject(new Error("Mật khẩu không khớp"));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu mới" />
          </Form.Item>

          <Form.Item>
            <div className="flex gap-3">
              <Button block onClick={() => navigate(-1)} style={{ borderColor: "#d1d5db", color: "#6b7280" }}>
                Quay lại
              </Button>
              <Button block htmlType="submit" loading={loading} style={{ background: "#0a3d62", borderColor: "#0a3d62", color: "#fff", fontWeight: 500 }}>
                Lưu
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
