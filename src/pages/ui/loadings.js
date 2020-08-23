import React from 'react'
import { Card,Button,Spin,Icon,Alert,Switch} from 'antd'
import {Loading3QuartersOutlined} from '@ant-design/icons';
import './ui.less'

export default class Loadings extends React.Component {
  state={
    loading:false
  }
  toggle =(value)=>{
    this.setState({
      loading:value
    })
  }
  render(){
    const icon = <Loading3QuartersOutlined style={{fontSize:24}}spin/>
    return(
      <div className="container">
        <Card title="Spin用法"className="card-wrap">
            <Spin size="small"/>
            <Spin size="default"style={{margin:'0 10px'}}/>
            <Spin size="large"/>
            <Spin indicator={icon} style={{marginLeft:10}}/>
        </Card>
        <Card title="内容遮罩">
            <Alert
              message="React"
              description="欢迎来到React高级实战课程"
              type="info"
            />
            <Spin>
              <Alert
                message="React"
                description="欢迎来到React高级实战课程"
                type="warning"
              />
            </Spin>
            <Spin tip="加载中...">
              <Alert
                message="React"
                description="欢迎来到React高级实战课程"
                type="warning"
              />
            </Spin>
            <Spin indicator={icon} spinning={this.state.loading}>
              <Alert
                message="React"
                description="欢迎来到React高级实战课程"
                type="warning"
              />
            </Spin>
            <div style={{ marginTop: 16 }}>
              区域变为加载中
              <Switch checked={this.state.loading} onChange={this.toggle} />
            </div>
        </Card>
      </div>
    )
  }
}