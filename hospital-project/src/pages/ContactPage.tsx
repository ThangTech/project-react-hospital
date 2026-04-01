import { Form, Input, Button } from "antd";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import PageHero from "../components/shared/PageHero";
import SectionTitle from "../components/shared/SectionTitle";

type ContactForm = {
  name: string;
  phone: string;
  email?: string;
  message: string;
};

const ContactPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values: ContactForm) => {
    
    console.log("Form submitted:", values);
    form.resetFields();
    alert("Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất.");
  };

  return (
    <div>
      <PageHero
        title="Liên Hệ"
        subtitle="Luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7"
        breadcrumbs={[{ label: "Liên hệ" }]}
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div>
            <SectionTitle
              title="Thông Tin Liên Hệ"
              subtitle="Liên hệ"
              centered={false}
            />

            <div className="space-y-5 mt-6">
              {[
                {
                  icon: <Phone size={20} />,
                  label: "Hotline",
                  value: "1900 xxxx (24/7)",
                },
                {
                  icon: <Mail size={20} />,
                  label: "Email",
                  value: "contact@hospital.vn",
                },
                {
                  icon: <MapPin size={20} />,
                  label: "Địa chỉ",
                  value: "123 Đường ABC, Quận 1, TP. HCM",
                },
                {
                  icon: <Clock size={20} />,
                  label: "Giờ làm việc",
                  value: "Thứ 2 – Thứ 7: 7:00 – 20:00 | Cấp cứu: 24/7",
                },
              ].map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#005b96]/10 rounded-xl flex items-center justify-center flex-shrink-0 text-[#005b96]">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">
                      {info.label}
                    </div>
                    <div className="text-gray-700 text-sm mt-0.5">
                      {info.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            
            <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 h-56 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.036388904106!2d106.08139067583832!3d20.870583493191543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135bd9b0b65c5b1%3A0x1790e509de354145!2zTmjDoCBOZ2jhu4kgVMOibSBBbg!5e0!3m2!1svi!2s!4v1774967455092!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>
          </div>

          
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Gửi tin nhắn
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.
            </p>

            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="name"
                label="Họ và tên"
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
              >
                <Input placeholder="Nguyễn Văn A" size="large" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
              >
                <Input placeholder="0912 345 678" size="large" />
              </Form.Item>

              <Form.Item name="email" label="Email">
                <Input placeholder="email@example.com" size="large" />
              </Form.Item>

              <Form.Item
                name="message"
                label="Nội dung"
                rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Câu hỏi hoặc yêu cầu của bạn..."
                />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  block
                  size="large"
                  style={{
                    background: "#005b96",
                    borderColor: "#005b96",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  Gửi liên hệ
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
