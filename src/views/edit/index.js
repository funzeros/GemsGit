import React, { Component } from 'react'
import { Input,message } from 'antd';
import './index.scss'
import Textarea from './textarea.js'
import Submit from './submit';
import axios from 'axios';
import qs from 'qs';

export default class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pwd:'fkc984512789',
            text:'',
            table:'',
            navid:'',
            navtext:'',
            type:'',
            subid:'',
            subtext:'',
            password:'',
            title:'',
        }
    }
    onChange = (e) => {
        this.setState({ text:e.target.value });
      };
    fillForm = (e)=>{
        switch(e.target.name){
            case "table":this.setState({ table:e.target.value });break;
            case "navid":this.setState({ navid:e.target.value });break;
            case "navtext":this.setState({ navtext:e.target.value });break;
            case "type":this.setState({ type:e.target.value });break;
            case "subid":this.setState({ subid:e.target.value });break;
            case "subtext":this.setState({ subtext:e.target.value });break;
            case "password":this.setState({ password:e.target.value });break;
            case "title":this.setState({ title:e.target.value });break;
            default :return;
        }
    }
    clearDoc=()=>{
        this.setState({
            pwd:'',
            text:'',
            table:'',
            navid:'',
            navtext:'',
            type:'',
            subid:'',
            subtext:'',
            password:'',
            title:'',
        })
    }
    sendMessge=async ()=>{
        const {table,text,navid,navtext,type,subid,subtext,password,title,pwd}=this.state;
        if(password===pwd){
            let sendData={
                "table":table,
                "nid":navid,
                "text":navtext,
                "type":type,
                "sid":subid,
                "stext":subtext,
                "title":title,
                "content":text            
            }
            await axios.post('/api/edit',qs.stringify(sendData))
                .then(res=>{
                    console.log(res.data);
                    message.success('文章提交成功');
                    this.clearDoc();
                })
                .catch(err=>{
                    message.success('网络不稳定,提交失败');
                    console.log(err);
                })
        }else{
            message.success('密码错误,提交失败.');
        }
       
    }
    render() {
        const {table,text,navid,navtext,type,subid,subtext,password,title}=this.state;
        return (
            <div className="edit-wrap">
                <div className="info">
                    <Input name="table" value={table} onChange={this.fillForm}  size="small" placeholder="表名" />
                    <Input name="navid" value={navid} onChange={this.fillForm} size="small" placeholder="navid" />
                    <Input name="navtext" value={navtext} onChange={this.fillForm} size="small" placeholder="navtext" />
                    <Input name="type" value={type} onChange={this.fillForm} size="small" placeholder="type" />
                    <Input name="subid" value={subid} onChange={this.fillForm} size="small" placeholder="subid" />
                    <Input name="subtext" value={subtext} onChange={this.fillForm} size="small" placeholder="subtext" />
                    <Input name="password" type="password" value={password} onChange={this.fillForm} size="small" placeholder="password" />
                </div>
                    <Input name="title" value={title} onChange={this.fillForm} placeholder="请输入标题" /> 
                <Textarea text={text} onChange={this.onChange} />
                <Submit sendMessge={this.sendMessge}/>
            </div>
        )
     
    }
  
}
