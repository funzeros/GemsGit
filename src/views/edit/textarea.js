import React from 'react';
import { Input } from 'antd';
import './textarea.scss'
const { TextArea } = Input;

export default class Textarea extends React.Component {
  state = {
  };

  

  render() {
    const {text,onChange} =this.props;
    return (
        <div style={{flex:1,display:'flex'}}>
        <TextArea
          value={text}
          onChange={onChange}
          placeholder="输入正文"  
          style={{flex:1}}
          />
        <p className="preShow"   dangerouslySetInnerHTML={{__html:text}} >
        </p>
        </div>
    );
  }
}
