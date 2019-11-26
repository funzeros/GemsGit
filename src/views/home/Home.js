import React,{ Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { CSSTransition } from 'react-transition-group'



import './home.scss'
import Artical from 'views/artical/Artical';
import axios from 'axios';
import Edit from 'views/edit';


const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Menu:[
                {"id":0,"name":"index","text":"首页","navs":[
                    {
                        "id" : 0,
                        "text" : "总览",
                        "type" : "bank",
                    },
                    {
                        "id":1,"text":"关于我","type":"user"
                    },
                    {
                        "id":2,"text":"关于本站","type":"global"
                    }
                ]},
                {"id":1,"name":"skill","text":"学术","navs":[
                    {
                        "id":0,"text":"JS","type":"code",
                    },
                    {
                        "id":1,"text":"React","type":"code"
                    },
                    {
                        "id":2,"text":"Vue","type":"code"
                    }
                ]},
                {"id":2,"name":"life","text":"生活","navs":[
                    {
                        "id":0,"text":"随笔","type":"container"
                    }, 
                    {
                        "id":1,"text":"日志","type":"container"
                    }
                ]},
                {"id":3,"name":"other","text":"其他","navs":[
                    {
                        "id":0,"text":"分享","type":"link"
                    },
                    {
                        "id":1,"text":"资料","type":"book"
                    }
                ]}
            ],
            navs:null,
            breadcrumb:null,
            breadcrumb2:[
                {
                    text:'加载中',
                    subs:[{text:'加载中'}]
                }
            ],
            menuSelectedKeys:"0",
            navSelectedKeys:"0",
            subSelectedKeys:"0",
            subIndex:0,
            siderWidth:100,
            editF:false,
            menuName:"index"
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState.navs){
            return {
                breadcrumb:prevState.Menu[prevState.menuSelectedKeys],
                breadcrumb2:prevState.navs
            }
        }
        return {
            breadcrumb:prevState.Menu[prevState.menuSelectedKeys]
            
        }
    }

    

    async componentDidMount(){
        let query=this.getQuery();
        let table=query.table||'index';
        await axios.get(`/api/article?table=${table}`)
            .then(res=>{
                this.setState({
                    navs:res.data
                })
            })
            .catch(err=>{
            console.log(err);
        });
        this.setState({
            navSelectedKeys:query.nid||'0',
            subSelectedKeys:query.sid||'0',
            subIndex:query.iid||0,
            menuSelectedKeys:query.menu||0
        })
        
    }

    componentDidUpdate(){
    }
    // 获取query
    getQuery=()=>{
        let query=window.location.search.substring(1).split('&').map(item=>{
            return item.split('=');

        });
        let obj ={}
        for(let item of query){
            obj[item[0]]=item[1];
        }
        return obj;
    } 

    setSearch=()=>{
        const {navSelectedKeys,subSelectedKeys,menuName,subIndex,menuSelectedKeys } = this.state;
        let search=`nid=${navSelectedKeys}&sid=${subSelectedKeys}&table=${menuName}&iid=${subIndex}&menu=${menuSelectedKeys}`;
        return search;
    }
    //渲染顶部菜单
    renderHeaderMenu=()=>{
        return this.state.Menu&&this.state.Menu.map(item=>{
            return (<Menu.Item name={item.name} key={item.id}>{item.text}</Menu.Item>)
        });
    }
    //渲染侧边菜单
    renderSiderMenu=()=>{
        // let navs = this.state.Menu[this.state.menuSelectedKeys].navs;
        let navs=this.state.navs;
        return navs&&(navs.map(item=>{
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

        }));
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
        // console.log(e);
        let table=e.item.props.name;
        this.setState({
            menuSelectedKeys:e.key,
            navSelectedKeys:"0",
            subSelectedKeys:"0",
            subIndex:0,
            menuName:table
        });
        await axios.get(`/api/article?table=${table}`)
            .then(res=>{
                this.setState({
                    navs:res.data
                })
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
    
    showIndex=()=>{
        // console.log("Hello , I am Gems!");
        this.setState({
            editF:!this.state.editF
        })
    }   

    changeSiderWith=(w)=>{
        this.setState({
            siderWidth:w
        })
    }
    render() {
        const { breadcrumb,breadcrumb2,menuSelectedKeys,navSelectedKeys,subIndex,siderWidth,editF } = this.state;
        return (
            <Layout className="home">
                {/* 头部 */}
                <Header className="header">
                    <div className="logo" onClick={this.showIndex}/>
                    {/* 菜单 */}
                    <Menu className="header"
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={menuSelectedKeys||'0'}
                    style={{ lineHeight: '40px' }}
                    onClick={this.changeKey}
                    >
                    {/* 渲染头部菜单 */}
                    {this.renderHeaderMenu()}
                </Menu>
                </Header>
                {/* 内容 */}
                <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '56px 0 16px' }}>
                    <Breadcrumb.Item>{breadcrumb.text}</Breadcrumb.Item>
                    <Breadcrumb.Item>{breadcrumb2[navSelectedKeys].text}</Breadcrumb.Item>
                    <Breadcrumb.Item>{breadcrumb2[navSelectedKeys].subs[subIndex].text}</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider  width={siderWidth} onMouseEnter={()=>{this.changeSiderWith(200)}} onMouseLeave={()=>{this.changeSiderWith(100)}} style={{ background: '#fff' }}>
                        {this.renderSiderMenuWrap()}
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Artical search={this.setSearch()} content={ breadcrumb2[navSelectedKeys].subs[subIndex] }/>
                    </Content>
                </Layout>
                </Content>
                {/* 尾部 */}
                <Footer style={{ textAlign: 'center' }}>Gems' Web ©2019 Created by Gems Fang</Footer>
                <CSSTransition
                in = { editF } //in的值必须变化的
                timeout = { 300 } // 动画的延迟时间
                unmountOnExit
                classNames = "fade">
                    <Edit key="12314"/>
                </CSSTransition> 
            </Layout>
        )
    }
}
