import React, { Component } from 'react'
import './index.scss'
import { Icon }  from 'antd'
// import classname from 'classname'

export default class GoTop extends Component {
    constructor(props) {
        super(props)

        this.state = {
             f:false,
             hover:0
        }
        window.onscroll=this.showGoTop;
    }
    goScrollTop=()=>{
        this.timer=setInterval(()=>{
            document.documentElement.scrollTop=document.documentElement.scrollTop-document.documentElement.scrollHeight/30;
            if(document.documentElement.scrollTop<2){
                document.documentElement.scrollTop=0;
                clearInterval(this.timer);
            }
        },10);
    }

    showGoTop=()=>{
        if(document.documentElement.scrollTop>200){
            this.setState({
                f:true
            })
        }else{
            this.setState({
                f:false,
                hover:0
            })
        }
    }

    changeHover=(hover)=>{
        this.setState({
            hover:hover
        })
    }
    changeStyle=()=>{
        let linkStyle;
        if(this.state.hover){
            linkStyle={color:this.props.color||'#ffde59'}
        }else{
            linkStyle={color:this.props.color||'#ffde59',opacity:0.4}
        }
        return linkStyle;
    }
    render() {
        const { f }=this.state;
        return (
            <div className="goTop">
                {f&&<Icon style={this.changeStyle()} onMouseEnter={()=>this.changeHover(1)} onMouseLeave={()=>this.changeHover(0)}  onClick={this.goScrollTop} className="upIcon" type="up-square" theme="filled" />}
            </div>
        )
    }
}
