import React from 'react'
import {Card,Form,Button,Input,message, Checkbox} from 'antd'
import { UserOutlined, LockOutlined} from '@ant-design/icons'
const FormItem = Form.Item;
export default class FormLogin extends React.Component{

  render(){
  const onFinish = values => {
    message.success("登陆成功！")
  };

  const onFinishFailed = errorInfo => {
    message.error("登陆失败！")
  };
    return(
      <div className="container">
          <Card title="登录行内表单"className="card-wrap">
          <Form layout="inline" >
                  <Form.Item>
                    <Input placeholder="请输入用户名"/>
                  </Form.Item>
                  <Form.Item>
                    <Input.Password placeholder="请输入密码"/>
                  </Form.Item>
                  <FormItem>
                      <Button type="primary">登录</Button>
                  </FormItem>
              </Form>
          </Card>

          <Card title="登录水平表单"className="card-wrap">
              <Form layout="horizontal"
                    style={{width:300}}
                    initialValues={{
                    username: '',
                    password:'',
                    remember:true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                  <FormItem
                   // label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: '用户名不能为空!',
                      },
                      {
                        min:5,max:10,
                        message: '长度不再范围内!',
                      },
                    ]}>
                      <Input prefix={<UserOutlined />} placeholder="请输入用户名"/>
                  </FormItem>

                  <FormItem
                   // label="Username"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: '密码不能为空!',
                      },
                    ]}>
                      <Input.Password prefix={<LockOutlined />} placeholder="请输入密码"/>
                  </FormItem>

                  <FormItem>
                      <FormItem
                        noStyle
                      // label="Username"
                        name="remember"
                        valuePropName="checked">
                          <Checkbox>记住密码</Checkbox>
                      </FormItem>
                      <a style={{float:'right'}}className="login-form-forgot" href="">忘记密码</a>
                  </FormItem>
                  
                  <FormItem>
                      <Button type="primary"htmlType="submit">登录</Button>
                  </FormItem>
              </Form>
          </Card>
      </div>
    )
  }

}
