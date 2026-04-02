import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, Steps } from "antd";
import backgroundImg from "../assets/background.jpg";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(0);

  return (
    <div className="flex w-full min-h-screen">
      <div
        className="hidden md:flex flex-1 flex-col justify-end p-10 relative"
        style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,61,98,0.92) 30%, rgba(10,61,98,0.3) 100%)" }} />
        <div className="relative z-10">
          <h1 className="text-white text-3xl font-semibold leading-snug mb-3" style={{ fontFamily: "Georgia, serif" }}>
            Khôi phục<br />tài khoản của bạn
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Chúng tôi sẽ hỗ trợ bạn<br />đặt lại mật khẩu an toàn.
          </p>
        </div>
      </div>

      <div className="w-full md:w-120 bg-white flex flex-col justify-center px-8 py-10">
        <h2 className="text-xl font-medium text-gray-800 mb-1">Quên mật khẩu</h2>
        <p className="text-sm text-gray-400 mb-5">
          {step === 0 ? "Nhập tên đăng nhập để nhận mã xác nhận" : "Nhập mã xác nhận và mật khẩu mới"}
        </p>

        <Steps
          current={step}
          size="small"
          className="mb-6"
          items={[{ title: "Xác minh" }, { title: "Đặt lại" }]}
        />

        {step === 0 && (
          <Form layout="vertical" requiredMark={false}>
            <Form.Item name="TenDangNhap" label="Tên đăng nhập" rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}>
              <Input placeholder="Tên đăng nhập của bạn" />
            </Form.Item>
            <Form.Item>
              <Button block onClick={() => setStep(1)} style={{ background: "#0a3d62", borderColor: "#0a3d62", color: "#fff", fontWeight: 500 }}>
                Tiếp theo
              </Button>
              <div className="text-center mt-3 text-xs text-gray-400">
                <Link to="/login" style={{ color: "#185FA5" }}>← Quay lại đăng nhập</Link>
              </div>
            </Form.Item>
          </Form>
        )}

        {step === 1 && (
          <Form layout="vertical" requiredMark={false}>
            <Form.Item name="ResetToken" label="Mã xác nhận" rules={[{ required: true, message: "Vui lòng nhập mã xác nhận" }]}>
              <Input placeholder="Mã reset password" />
            </Form.Item>

            <Form.Item name="MatKhauMoi" label="Mật khẩu mới" rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }, { min: 6, message: "Tối thiểu 6 ký tự" }]}>
              <Input.Password placeholder="Tối thiểu 6 ký tự" />
            </Form.Item>

            <Form.Item
              name="XacNhan"
              label="Xác nhận mật khẩu"
              dependencies={["MatKhauMoi"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("MatKhauMoi") === value) return Promise.resolve();
                    return Promise.reject(new Error("Mật khẩu không khớp"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu mới" />
            </Form.Item>

            <Form.Item>
              <div className="flex gap-3">
                <Button block onClick={() => setStep(0)} style={{ borderColor: "#d1d5db", color: "#6b7280" }}>
                  Quay lại
                </Button>
                <Button block htmlType="submit" style={{ background: "#0a3d62", borderColor: "#0a3d62", color: "#fff", fontWeight: 500 }}>
                  Đặt lại
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;