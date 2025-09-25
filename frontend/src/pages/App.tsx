import { NavLink, useNavigate } from "react-router";
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
  ArrowRightOutlined,
  PieChartFilled,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Divider, Space, Tabs, message, theme } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import api from '../api/api';

type LoginType = 'phone' | 'account';
type AccessType = 'login' | 'register';

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const LoginPage = () => {
  const [loginType, setLoginType] = useState<LoginType>('account');
  const [accessType, setAccessType] = useState<AccessType>('login');
  const { token } = theme.useToken();
  const [showIcon, setShowIcon] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      const res = await api.post("/auth/login", values);

      // 后端返回格式：{ success: true, message: "...", username: {...} }
      if (res.data?.success) {
        messageApi.success("登录成功！");
        navigate("/home"); // 跳转到首页
      } else {
        messageApi.error("登录失败，请检查用户名和密码。");
      }
    } catch (error: any) {
      messageApi.error("Bad Connection to Server");
      console.error("登录失败:", error);
    }
  };

  const handleRegister = async (values: { username: string; email: string; password: string }) => {
    try {
      const res = await api.post("/auth/register", values);

      // 后端返回格式：{ success: true, message: "...", username: {...} }
      if (res.data?.success) {
        messageApi.success("注册成功！");
        navigate("/login"); // 跳转到登录页
      } else {
        messageApi.error("注册失败，请检查用户名和密码。");
      }
    } catch (error: any) {
      messageApi.error("Bad Connection to Server");
      console.error("注册失败:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      {contextHolder}
      <LoginFormPage
        submitter={{
          searchConfig: {
            submitText: accessType === 'login' ? '登录' : '注册',
          }
        }}
        {...(accessType === 'login' ? { onFinish: handleLogin }
          : { onFinish: handleRegister }
        )}
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo={<PieChartFilled style={{ fontSize: 40, color: 'white' }} />}
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="LoginWebpage"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        subTitle="TEST ONLY"
        activityConfig={{
          action: (
            <Button
              size="large"
              href='https://www.pm25oo.top'
              target='_blank'
              style={{
                borderRadius: 20,
                background: token.colorBgElevated,
                color: token.colorPrimary,
                width: 120,
              }}
              onMouseEnter={() => setShowIcon(true)}
              onMouseLeave={() => setShowIcon(false)}
            >
              {!showIcon && 'Visit my site'}
              {showIcon && <ArrowRightOutlined />}
            </Button>
          ),
        }}
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Divider plain>
              <span
                style={{
                  color: token.colorTextPlaceholder,
                  fontWeight: 'normal',
                  fontSize: 14,
                }}
              >
                其他登录方式(未开发)
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}
              >
                <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}
              >
                <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}
              >
                <WeiboOutlined style={{ ...iconStyles, color: '#1890ff' }} />
              </div>
            </Space>
          </div>
        }
      >
        <NavLink to="/home" end>
          Hack!!!
        </NavLink>
        {accessType === 'login' && (
          <>
            <Tabs
              centered
              activeKey={loginType}
              onChange={(activeKey) => setLoginType(activeKey as LoginType)}
            >
              <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
              <Tabs.TabPane key={'phone'} tab={'手机号登录(未开发)'} />
            </Tabs>
          </>
        )}
        {accessType === 'register' && (
          <>
            <Tabs
              centered
            >
              <Tabs.TabPane key={'register'} tab={'注册'} />
            </Tabs>
          </>
        )}

        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            {accessType === 'register' && (
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <UserOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                placeholder={'邮箱'}
                rules={[
                  {
                    required: true,
                    message: '请输入邮箱!',
                  },
                  {
                    type: 'email',
                    message: '请输入有效的邮箱地址!',
                  },
                ]}
              />
            )}
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: (
                  <MobileOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '哈基米！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '哈！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          {accessType === 'login' && (
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          )}
          <a
            style={{
              float: 'right',
              marginRight: 16,
            }}
            onClick={() =>
              setAccessType(accessType === 'login' ? 'register' : 'login')
            }
          >
            {accessType === 'login' ? '注册新用户' : '返回登录'}
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};

const App = () => {
  return (
    <ProConfigProvider dark>
      <LoginPage />
    </ProConfigProvider>
  );
};

export default App;