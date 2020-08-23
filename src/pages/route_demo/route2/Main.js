import React from 'react'
import {Link} from 'react-router-dom'

export default class Main extends React.Component {
  render() {
    return (
      <div>This is Main
          <Link to="/main/ChildRouter">嵌套路由</Link>
          <hr/>
          {this.props.children}
      </div>
    );
  }
}