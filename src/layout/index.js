import React, { Component } from 'react'
import './index.scss'
import Home from 'views/home/Home'


export default class LayOut extends Component {
    render() {
        return (
            <div className="layout">
               <Home/>
            </div>
        )
    }
}
