import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, Steps, message } from "antd";
import backgroundImg from "../../assets/background.jpg";
import { forgotPassword, resetPassword } from "../../services/api.auth.service";

type ForgotFormValues = {
  Email?: string;
  OtpCode?: string;
  MatKhauMoi?: string;
  XacNhan?: string;
};

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<ForgotFormValues>();

  const onSendOtp = async () => {
    const values = await form.validateFields(["Email"]);
    setLoading(true);
    try {
      await forgotPassword({ Email: values.Email! });
      message.success("Đã gửi mã OTP");
      setStep(1);
    } catch (error: any) {
      const msg = error?.response?.data?.message ?? error?.message ?? "Gửi OTP thất bại";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const onReset = async () => {
    const values = await form.validateFields(["Email", "OtpCode", "MatKhauMoi", "XacNhan"]);
    setLoading(true);
    try {
      await resetPassword({
        Email: values.Email!,
        OtpCode: values.OtpCode!,
        MatKhauMoi: values.MatKhauMoi!,
      });
      message.success("Đặt lại mật khẩu thành công");
      form.resetFields();
      setStep(0);
    } catch (error: any) {
      const msg = error?.response?.data?.message ?? error?.message ?? "Đặt lại mật khẩu thất bại";
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
            Khôi phục
            <br />
tài khoản của bạn
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Nhận OTP qua email rồi đặt lại mật khẩu mới.
          </p>
        </div>
      </div>

      <div className="w-full md:w-120 bg-white flex flex-col justify-center px-8 py-10">
        <h2 className="text-xl font-medium text-gray-800 mb-1">Quên mật khẩu</h2>
        <p className="text-sm text-gray-400 mb-5">
          {step === 0 && "Nhập email để nhận mã OTP"}
          {step === 1 && "Nhập OTP và mật khẩu mới"}
        </p>

        <Steps current={step} size="small" className="mb-6" items={[{ title: "Email" }, { title: "Đặt lại" }]} />

        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item name="Email" label="Email đã đăng ký" rules={[{ required: true, message: "Vui lòng nhập email" }, { type: "email", message: "Email không hợp lệ" }]}>
            <Input placeholder="example@hospital.com" type="email" />
          </Form.Item>

          {step === 1 && (
            <>
              <Form.Item name="OtpCode" label="Mã OTP" rules={[{ required: true, message: "Vui lòng nhập OTP" }, { len: 6, message: "OTP phải có 6 số" }, { pattern: /^\d{6}$/, message: "OTP chỉ gồm chữ số" }]}>
                <Input placeholder="Nhập 6 số" maxLength={6} />
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
            </>
          )}

          <Form.Item>
            <div className="flex gap-3">
              <Button block onClick={() => setStep(0)} style={{ borderColor: "#d1d5db", color: "#6b7280" }}>
                Quay lại
              </Button>
              {step === 0 ? (
                <Button block loading={loading} onClick={onSendOtp} style={{ background: "#0a3d62", borderColor: "#0a3d62", color: "#fff", fontWeight: 500 }}>
                  Gửi mã OTP
                </Button>
              ) : (
                <Button block loading={loading} onClick={onReset} style={{ background: "#0a3d62", borderColor: "#0a3d62", color: "#fff", fontWeight: 500 }}>
                  Đặt lại
                </Button>
              )}
            </div>
            <div className="text-center mt-3 text-xs text-gray-400">
              <Link to="/login" style={{ color: "#185FA5" }}>← Quay lại đăng nhập</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
