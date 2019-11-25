import React, { Component } from 'react'
import '../scss/layout.scss'
import Home from '../components/home/Home'


export default class LayOut extends Component {
    render() {
        return (
            <div className="layout">
               <Home/>
            </div>
        )
    }
}
