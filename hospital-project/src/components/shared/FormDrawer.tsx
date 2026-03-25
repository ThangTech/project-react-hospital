import { Drawer } from 'antd';
import type { ReactNode } from 'react';

type FormDrawerProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  width?: number;
}

const FormDrawer = ({ open, title, onClose, children, footer, width = 480 }: FormDrawerProps) => {
  return (
    <Drawer
      open={open}
      title={title}
      onClose={onClose}
      width={width}
      footer={footer}
      destroyOnClose
    >
      {children}
    </Drawer>
  );
};

export default FormDrawer;
