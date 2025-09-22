import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <Result
        status="success"
        title="登录成功！"
        subTitle="欢迎来到主页面"
        extra={[
          <Button type="primary" key="back" onClick={() => navigate('/')}>
            返回登录页
          </Button>,
        ]}
      />
    </div>
  );
};

export default HomePage;