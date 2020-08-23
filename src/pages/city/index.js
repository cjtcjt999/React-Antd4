import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import { createStore } from "redux";
const FormItem = Form.Item;
const Option = Select.Option;
export default class City extends React.Component {

  state = {
    list: [],
    isShowOpenCity: false,
    word:'重置'
  }
  params = {
    page: 1
  }
  componentDidMount() {
    // this.requestList()
  }

  // 默认请求我们的接口数据
  requestList = () => {
    let _this = this;
    axios.ajax({
      url: '/open_city',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      let list = res.result.item_list.map((item, index) => {
        item.key = index;
        return item;
      });
      this.setState({
        list: list,
        pagination: Utils.pagination(res, (current) => {
          _this.params.page = current;
          _this.requestList();
        })
      })
    })
  }

  // 开通城市
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    })
  }
  // 城市开通提交
  handleSubmit = () => {
    let cityInfo = this.refs.cityForm.getFieldsValue();
    console.log(cityInfo);
    axios.ajax({
      url: '/city/open',
      data: {
        params: cityInfo
      }
    }).then((res) => {
      if (res.code == '0') {
        message.success('开通成功');
        this.setState({
          isShowOpenCity: false
        })
        this.requestList();
      }
    })
  }
  handleShowDetail = () => {
    const fieldValue = this.refs.formsearch.getFieldsValue();
    let chooseDetail, chooseDetail2, chooseDetail3 = false;
    console.log(fieldValue)
    let _this = this;
    axios.ajax({
      url: '/open_city',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      let list = res.result.item_list.map((item, index) => {
        console.log(item);
        fieldValue.mode == item.mode || !fieldValue.mode ? chooseDetail = true : chooseDetail = false;
        fieldValue.op_mode == item.op_mode || !fieldValue.op_mode ? chooseDetail2 = true : chooseDetail2 = false
        fieldValue.city_id == item.name || !fieldValue.city_id ? chooseDetail3 = true : chooseDetail3 = false
        return chooseDetail && chooseDetail2 && chooseDetail3 ? item : null
      }).filter(v => v);
      this.setState({
        list: list,
        pagination: Utils.pagination(res, (current) => {
          _this.params.page = current;
          _this.handleShowDetail();
        })
      })
    })

  }
  handleReset = ()=>{
    let word = this.state.word.concat("啊");
    let aaa = <div style={{color:'red'}}>啊啊啊啊啊啊啊啊啊</div>
    this.setState({
      word,
      aaa
    })
  }
  render() {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'
      }, {
        title: '城市名称',
        dataIndex: 'name'
      }, {
        title: '用车模式',
        dataIndex: 'mode',
        render(mode) {
          return mode == 1 ? '停车点' : '禁停区';
        }
      }, {
        title: '营运模式',
        dataIndex: 'op_mode',
        render(op_mode) {
          return op_mode == 1 ? '自营' : '加盟';
        }
      }, {
        title: '授权加盟商',
        dataIndex: 'franchisee_name'
      }, {
        title: '城市管理员',
        dataIndex: 'city_admins',
        render(arr) {
          return arr && arr.map((item) => {
            return item.user_name;
          }).join(',');
        }
      }, {
        title: '城市开通时间',
        dataIndex: 'open_time'
      }, {
        title: '操作时间',
        dataIndex: 'update_time',
        render: Utils.formateDate
      }, {
        title: '操作人',
        dataIndex: 'sys_user_name'
      }
    ]
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }
    return (
      <div className="container">
        <Card>
          <Form layout="inline" ref="formsearch">
            <FormItem label="城市" name="city_id">
              {

                <Select
                  style={{ width: 100 }}
                  placeholder="全部"
                >
                  <Option value="">全部</Option>
                  <Option value="北京市">北京市</Option>
                  <Option value="天津市">天津市</Option>
                  <Option value="深圳市">深圳市</Option>
                </Select>

              }
            </FormItem>
            <FormItem label="用车模式" name="mode">
              {

                <Select
                  style={{ width: 120 }}
                  placeholder="全部"
                >
                  <Option value="">全部</Option>
                  <Option value="1">指定停车点模式</Option>
                  <Option value="2">禁停区模式</Option>
                </Select>

              }
            </FormItem>
            <FormItem label="营运模式" name="op_mode">
              {

                <Select
                  style={{ width: 80 }}
                  placeholder="全部"
                >
                  <Option value="">全部</Option>
                  <Option value="1">自营</Option>
                  <Option value="2">加盟</Option>
                </Select>

              }
            </FormItem>
            <FormItem label="加盟商授权状态" name="auth_status">
              {

                <Select
                  style={{ width: 100 }}
                  placeholder="全部"
                >
                  <Option value="">全部</Option>
                  <Option value="1">已授权</Option>
                  <Option value="2">未授权</Option>
                </Select>

              }
            </FormItem>
            <FormItem>
              <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleShowDetail}>查询</Button>
              <Button onClick={this.handleReset}>{this.state.word}</Button>
              {this.state.aaa}
            </FormItem>
          </Form>
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        <Modal
          forceRender
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            })
          }}
          onOk={this.handleSubmit}
        >
          
          <Form layout="horizontal"
            ref="cityForm"
            initialValues={{ city_id: '1', op_mode: '1', use_mode: '1' }}>
            <FormItem label="选择城市" name="city_id" {...formItemLayout}>
              {

                <Select style={{ width: 100 }}>
                  <Option value="">全部</Option>
                  <Option value="1">北京市</Option>
                  <Option value="2">天津市</Option>
                </Select>

              }
            </FormItem>
            <FormItem label="营运模式" name="op_mode"{...formItemLayout}>
              {

                <Select style={{ width: 100 }}>
                  <Option value="1">自营</Option>
                  <Option value="2">加盟</Option>
                </Select>

              }
            </FormItem>
            <FormItem label="用车模式" name="use_mode" {...formItemLayout}>
              {

                <Select style={{ width: 100 }}>
                  <Option value="1">指定停车点</Option>
                  <Option value="2">禁停区</Option>
                </Select>

              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}