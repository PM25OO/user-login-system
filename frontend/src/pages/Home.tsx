import { Button, message, Result, Table } from 'antd';
import { useNavigate } from 'react-router';
import api from '../api/api';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [accessPermission, setAccessPermission] = useState<boolean>(true);
  const [userList, setUserList] = useState<any[]>([]);

  const visitData = async () => {
    try {
      const res = await api.get("/api/protected", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 从本地存储中获取token
        },
      });
      if (res.data?.success) {
        messageApi.success(res.data?.message || "访问受保护资源成功！");
        const users = res.data.database;
        setUserList(users);
        setAccessPermission(true);
      } else {
        messageApi.error(res.data?.message || "访问受保护资源失败，请重新登录。");
        setAccessPermission(false);
      }
    } catch (error: any) {
      messageApi.error("访问受保护资源失败，请重新登录。");
      console.error("Error accessing protected resource:", error);
      setAccessPermission(false);
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
        status={accessPermission ? "success" : "error"}
        title={accessPermission ? "登录成功!" : "请求失败"}
        subTitle={accessPermission ? "欢迎来到主页面" : "请重新登录"}
        extra={[
          <Button type="primary" key="back" onClick={() => navigate('/login')}>
            返回登录页
          </Button>,
        ]}
      />
      <Table
        dataSource={userList}
        columns={[
          { title: "ID", dataIndex: "id", key: "id" },
          { title: "用户名", dataIndex: "username", key: "username" },
          { title: "邮箱", dataIndex: "email", key: "email" },
          { title: "操作", key: "action", render: () => (
            <Button type="link" onClick={() => messageApi.info("功能待实现")}>
              删除用户
            </Button>
          ) },
        ]}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default HomePage;