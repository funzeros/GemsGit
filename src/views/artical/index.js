import React, { Component } from 'react'
import { Icon,message } from 'antd'
import './index.scss'
import copy from 'copy-to-clipboard';


export default class Artical extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            title:nextProps.content.title,
            text:nextProps.content.content,
            search:nextProps.search
        }; 
    }
    copyUrl=()=>{
        if(copy('http://'+window.location.host+'?'+this.state.search)){
            message.success('链接复制成功');
        }else{
            message.error('链接复制失败');
        }
    }
    render() {
        const { title,text } = this.state
        const html={
            __html:text
        }
        return (
            <div className="artical">
                <h2>
                    { title }
                    {title&&<Icon className="share" onClick={this.copyUrl} type="share-alt" />}
                </h2>
                <hr/>
                <p dangerouslySetInnerHTML={ html }>
                </p>
            </div>
        )
    }
}
