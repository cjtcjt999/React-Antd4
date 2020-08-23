import React from 'react'
import { Card, Row, Col,Modal} from 'antd'
import './ui.less'

export default class Gallery extends React.Component {
  state={
    visible:false
  }
  openGallery = (imgSrc)=>{
    this.setState({
        visible:true,
        currentImg: '/gallery/'+imgSrc
    })
  }
  render(){
    const imgs= [
        ['1.png','2.png','3.png','4.png','5.png'],
        ['1.png','2.png','3.png','4.png','5.png'],
        ['1.png','2.png','3.png','4.png','5.png'],
        ['1.png','2.png','3.png','4.png','5.png'],
        ['1.png','2.png','3.png','4.png','5.png']
    ]
    const imgList = imgs.map((list)=>list.map((item)=>
      <Card 
        style={{marginBottom:10}}
        cover={<img src={'/gallery/'+item} onClick={()=>this.openGallery(item)}/>}
      >
          <Card.Meta
            title="React Admin"
            description="I Love CJT"
          />
      </Card>
    ))
    return(
      <div className="container">
          <Row gutter={10}>
              <Col md={5}>
                  {imgList[0]}
              </Col>
              <Col md={5}>
                  {imgList[1]}
              </Col>
              <Col md={5}>
                  {imgList[2]}
              </Col>
              <Col md={5}>
                  {imgList[3]}
              </Col>
              <Col md={4}>
                  {imgList[4]}
              </Col>
          </Row>
          <Modal
              visible={this.state.visible}
              onCancel={()=>{
                this.setState({
                  visible:false
                })
              }}
              title="图片画廊"
              width={300}
              height={500}
              footer={null}
          >
              <img src={this.state.currentImg} alt=""style={{width:'100%'}}/>
          </Modal>
      </div>
    )
  }
}