import { Button, message, Result } from 'antd';
import { useNavigate } from 'react-router';
import api from '../api/api';
import { useEffect } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const visitData = async () => {
    try {
      const res = await api.get("/api/protected", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 从本地存储中获取token
        },
      });
      console.log("Protected data:", res.data);
    } catch (error: any) {
      messageApi.error("访问受保护资源失败，请重新登录。");
      console.error("Error accessing protected resource:", error);
    }
  };

  useEffect(() => {
    visitData();
  }, []);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F0F0F0'
    }}>
      {contextHolder}
      <Result
        status="success"
        title="登录成功!"
        subTitle="欢迎来到主页面"
        extra={[
          <Button type="primary" key="back" onClick={() => navigate('/login')}>
            返回登录页
          </Button>,
        ]}
      />
    </div>
  );
};

export default HomePage;