import { Link } from "react-router-dom";
import { Button, Form, Input, Select } from "antd";
import backgroundImg from "../assets/background.jpg";

const ROLES = [
  { value: "BenhNhan", label: "Bệnh nhân" },
  { value: "BacSi", label: "Bác sĩ" },
  { value: "YTa", label: "Y tá / Điều dưỡng" },
  { value: "KeToan", label: "Kế toán" },
  { value: "Admin", label: "Quản trị viên" },
];

const RegisterPage = () => (
  <div className="flex w-full min-h-screen">
    <div
      className="hidden md:flex flex-1 flex-col justify-end p-10 relative"
      style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,61,98,0.92) 30%, rgba(10,61,98,0.3) 100%)" }} />
      <div className="relative z-10">
        <h1 className="text-white text-3xl font-semibold leading-snug mb-3" style={{ fontFamily: "Georgia, serif" }}>
          Tham gia cùng<br />đội ngũ của chúng tôi
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
          Hệ thống quản lý bệnh viện hiện đại,<br />nâng cao chất lượng chăm sóc bệnh nhân.
        </p>
      </div>
    </div>

    <div className="w-full md:w-120 bg-white flex flex-col justify-center px-8 py-10">
      <h2 className="text-xl font-medium text-gray-800 mb-1">Tạo tài khoản</h2>
      <p className="text-sm text-gray-400 mb-6">Điền đầy đủ thông tin để đăng ký</p>

      <Form layout="vertical" requiredMark={false}>
        <Form.Item name="TenDangNhap" label="Tên đăng nhập" rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}>
          <Input placeholder="vd: nguyen_van_a" />
        </Form.Item>

        <Form.Item name="VaiTro" label="Vai trò" rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}>
          <Select placeholder="Chọn vai trò" options={ROLES} />
        </Form.Item>

        <Form.Item name="MatKhau" label="Mật khẩu" rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }, { min: 6, message: "Tối thiểu 6 ký tự" }]}>
          <Input.Password placeholder="Tối thiểu 6 ký tự" />
        </Form.Item>

        <Form.Item
          name="XacNhan"
          label="Xác nhận mật khẩu"
          dependencies={["MatKhau"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("MatKhau") === value) return Promise.resolve();
                return Promise.reject(new Error("Mật khẩu không khớp"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>

        <Form.Item>
          <Button block htmlType="submit" style={{ background: "#0a3d62", borderColor: "#0a3d62", color: "#fff", fontWeight: 500 }}>
            Đăng ký
          </Button>
          <div className="text-center mt-3 text-xs text-gray-400">
            Đã có tài khoản?{" "}
            <Link to="/login" style={{ color: "#185FA5" }}>Đăng nhập</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  </div>
);

export default RegisterPage;