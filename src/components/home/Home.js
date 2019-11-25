import React,{ Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import '../../scss/home.scss'
import Artical from '../artical/Artical';
import axios from 'axios';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Menu:[
                {"id":0,"text":"首页","navs":[
                    {
                        "id" : 0,
                        "text" : "总览",
                        "type" : "bank",
                        "subs" : [ 
                            {
                                "id" : 0,
                                "text" : "最新",
                                "title" : "最新发布",
                                "content" : "test"
                            }, 
                            {
                                "id" : 1,
                                "text" : "Go For It",
                                "title" : "Go For It",
                                "content" : "test"
                            }
                        ]
                    },
                    {
                        "id":1,"text":"关于我","type":"user","subs":[
                            {"id":3,"text":"何为Gems"},
                            {"id":4,"text":"我的前端之缘"},
                            {"id":5,"text":"On The Road"}
                        ]
                    },
                    {
                        "id":2,"text":"关于本站","type":"global","subs":[
                            {"id":6,"text":"何来此站"},
                            {"id":7,"text":"于何用"},
                            {"id":8,"text":"To Be Continue"}
                        ]
                    }
                ]},
                {"id":1,"text":"学术","navs":[
                    {
                        "id":0,"text":"JS","type":"code","subs":[
                            {"id":0,"text":"更新中"}
                        ]
                    },
                    {
                        "id":1,"text":"React","type":"code","subs":[
                            {"id":100,"text":"更新中"}
                        ]
                    },
                    {
                        "id":2,"text":"Vue","type":"code","subs":[
                            {"id":200,"text":"更新中"}
                        ]
                    }
                ]},
                {"id":2,"text":"生活","navs":[
                    {
                        "id":0,"text":"随笔","type":"container","subs":[
                            {"id":0,"text":"更新中"}
                        ]
                    }, 
                    {
                        "id":1,"text":"日志","type":"container","subs":[
                            {"id":200,"text":"更新中"}
                        ]
                    }
                ]},
                {"id":3,"text":"其他","navs":[
                    {
                        "id":0,"text":"分享","type":"link","subs":[
                            {"id":0,"text":"更新中"}
                        ]
                    },
                    {
                        "id":1,"text":"资料","type":"book","subs":[
                            {"id":10,"text":"更新中"}
                        ]
                    }
                ]}
            ],
            breadcrumb:null,
            menuSelectedKeys:"0",
            navSelectedKeys:"0",
            subSelectedKeys:"0",
            subIndex:0,
            countNum:0
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {breadcrumb:prevState.Menu[prevState.menuSelectedKeys]}
    }

    async componentDidMount(){
        let table="index"
        await axios.get(`http://172.20.10.5:9001/article?table=${table}`)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
            console.log(err);
        });
    }
    //渲染顶部菜单
    renderHeaderMenu=()=>{
        return this.state.Menu&&this.state.Menu.map(item=>{
            return (<Menu.Item key={item.id}>{item.text}</Menu.Item>)
        });
    }
    //渲染侧边菜单
    renderSiderMenu=()=>{
        let navs = this.state.Menu[this.state.menuSelectedKeys].navs;
        return navs&&navs.map(item=>{
            this.renderSubItem=()=>{
                let subs=item.subs;
                return subs&&subs.map(sub=>{
                    return (
                        <Menu.Item key={sub.id}>{sub.text}</Menu.Item>
                    )
                });
            }
            return  (
                <SubMenu
                key={item.id}
                title={
                    <span>
                    <Icon type={item.type} />
                        {item.text}
                    </span>
                }
                >
                   {this.renderSubItem()}
                </SubMenu>
            )

        });
    }
    renderSiderMenuWrap=()=>{
        const { subSelectedKeys,navSelectedKeys } = this.state;
        return(
            <Menu
                mode="inline"
                selectedKeys={[subSelectedKeys]}
                defaultOpenKeys={[navSelectedKeys]}
                style={{ height: "100%" }}
                onClick={this.changeNavKey}
            >
                {this.renderSiderMenu()}
            </Menu>
        )
    }
    //修改顶部菜单默认KEY
    changeKey=async (e)=>{
        this.setState({
            menuSelectedKeys:e.key,
            navSelectedKeys:"0",
            subSelectedKeys:"0",
            subIndex:0
        });
        let table="index"
        await axios.get(`http://172.20.10.5:9001/article?table=${table}`)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
            console.log(err);
        });
    }
    changeNavKey=(e)=>{
        this.setState({
            navSelectedKeys:e.keyPath[1],
            subSelectedKeys:e.keyPath[0],
            subIndex:e.item.props.index
        })
        
    }
    
    showIndex=(e)=>{
        this.setState({countNum:this.state.countNum+1})
        console.log("Hello , I am Gems!",this.state.countNum);
    }   
    render() {
        const { breadcrumb,menuSelectedKeys,navSelectedKeys,subIndex } = this.state;
        return (
            <Layout>
                {/* 头部 */}
                <Header className="header">
                    <div className="logo" onClick={this.showIndex}/>
                    {/* 菜单 */}
                    <Menu className="header"
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={menuSelectedKeys}
                    style={{ lineHeight: '40px' }}
                    onClick={this.changeKey}
                    >
                    {/* 渲染头部菜单 */}
                    {this.renderHeaderMenu()}
                </Menu>
                </Header>
                {/* 内容 */}
                <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>{breadcrumb.text}</Breadcrumb.Item>
                    <Breadcrumb.Item>{breadcrumb.navs[navSelectedKeys].text}</Breadcrumb.Item>
                    <Breadcrumb.Item>{breadcrumb.navs[navSelectedKeys].subs[subIndex].text}</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                        {this.renderSiderMenuWrap()}
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Artical/>
                    </Content>
                </Layout>
                </Content>
                {/* 尾部 */}
                <Footer style={{ textAlign: 'center' }}>Gems' Web ©2019 Created by Gems Fang</Footer>
            </Layout>
        )
    }
}
