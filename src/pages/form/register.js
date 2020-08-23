import React from 'react'
import { Card, Form, Button, Input, message, Checkbox, Switch, DatePicker, TimePicker, Upload, InputNumber, Radio, Select } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const TextArea = Input.TextArea;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default class Register extends React.Component {
  state = {
    loading: false,
  };
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const formItemLayout = {
      labelCol:{
        xs:24,
        sm:4,
      },
      wrapperCol:{
        xs:24,
        sm:12
      }
    }
    const offsetLayout = {
      wrapperCol:{
        xs:24,
        sm:{
            span:12,
            offset:4
        }
      }
    }
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    const onFinish = values => {
      console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    return (
      <div className="container">
        <Card title="注册表单" className="card-wrap">
            <Form layout="horizontal"
                  initialValues={{sex:'1',
                  age:'18',
                  state:'1',
                  hobby:['1','2','3'],
                  birthday:moment('2020-7-3'),
                  address:'浙江省杭州市江干区',}}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: '用户名不能为空!',
                      }
                    ]}>
                      <Input placeholder="请输入用户名"/>
                  </FormItem>

                  <FormItem
                  {...formItemLayout}
                    label="密码"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: '密码不能为空!',
                      },
                    ]}>
                      <Input.Password placeholder="请输入密码"/>
                  </FormItem>

                  <FormItem {...formItemLayout}
                    label="性别"
                    name="sex">
                      <RadioGroup>
                          <Radio value="1">男</Radio>
                          <Radio value="2">女</Radio>
                      </RadioGroup>
                  </FormItem>
                  <FormItem {...formItemLayout}
                    label="年龄"
                    name="age">
                      <InputNumber/>
                  </FormItem>

                  <FormItem {...formItemLayout}
                    label="当前状态"
                    name="state">
                      <Select>
                          <Option value="1">咸鱼一条</Option>
                          <Option value="2">风华浪子</Option>
                          <Option value="3">北大才子</Option>
                          <Option value="4">百度FE</Option>
                          <Option value="5">创业者</Option>
                      </Select>
                  </FormItem>

                  <FormItem {...formItemLayout}
                    label="爱好"
                    name="hobby">
                      <Select mode="multiple">
                          <Option value="1">游泳</Option>
                          <Option value="2">打篮球</Option>
                          <Option value="3">踢足球</Option>
                          <Option value="4">跑步</Option>
                          <Option value="5">爬山</Option>
                          <Option value="6">骑行</Option>
                          <Option value="7">桌球</Option>
                          <Option value="8">麦霸</Option>
                      </Select>
                  </FormItem>
                  <FormItem {...formItemLayout}
                    label="是否已婚"
                    name="isMarryed">
                      {
                        <Switch defaultChecked />
                      }
                  </FormItem>
                  <FormItem {...formItemLayout}
                    label="生日"
                    name="birthday">
                      {
                        <DatePicker showTime format="YYYY-MM-DD"/>
                      }
                  </FormItem>
                  <FormItem {...formItemLayout}
                    label="联系地址"
                    name="address">
                      {
                        <TextArea autoSize={{minRows:3,maxRows:6}}/>
                      }
                  </FormItem>
                  <FormItem {...formItemLayout}
                    label="早期时间"
                    name="getuptime">
                      {
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                      }
                  </FormItem>
                  <FormItem {...formItemLayout}
                    label="头像"
                    name="headphoto">
                      {
                        <Upload listType="picture-card"
                              showUploadList={false}
                              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              beforeUpload={beforeUpload}
                              onChange={this.handleChange}>
                          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                      }
                  </FormItem>
                  <FormItem {...offsetLayout}
                    name="alreadyread">
                      {
                        <Checkbox>我已阅读过<a href="">慕课协议</a></Checkbox>
                      }
                  </FormItem>
                  <FormItem {...offsetLayout}
                    name="registerbtn">
                      {
                        <Button type="primary"htmlType="submit">注册</Button>
                      }
                  </FormItem>
            </Form>
        </Card>
      </div>
    )
  }
}