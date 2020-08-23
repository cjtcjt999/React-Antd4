import React from 'react'
import {Row,Col} from "antd"
import './index.less'
import Util from '../../utils/utils'
import axios from 'axios'
export default class Header extends React.Component{
    state={}
    componentWillMount(){
        this.setState({
            userName:'褚锦涛'
        })
        setInterval(()=>{
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)
        this.getWeatherAPIData();
    }
    getWeatherAPIData(){
        let city = 'hangzhou';
        axios.get('https://api.66mz8.com/api/weather.php?location='+encodeURIComponent(city)).then((res)=>{
            if(res.data.code === 200){
                let data = res.data.data[0];
                console.log(data)
                this.setState({
                    weather:data.weather,
                    weatherIcon:data.weather_icon
                })
            }
        })
    }

    render(){
      const menuType = this.props.menuType
        return(
            <div className="header">
                <Row className="header-top">
                  {
                    menuType?
                      <Col span="6"className="logo">
                          <img src="/assets/logo-ant.svg" alt=""/>
                          <span>IMooc 通用管理系统</span>
                      </Col>
                      :''
                  }
                    <Col span={menuType?18:24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                  menuType?'':
                  <Row className="breadcrumb">
                    <Col span="4"className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span="20"className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-detail">
                            {this.state.weather}
                            <img style={{marginLeft:'5px',marginBottom:'5px'}} src={this.state.weatherIcon}/>
                        </span>
                    </Col>
                </Row>
                }
                
            </div>
        );
    }
}