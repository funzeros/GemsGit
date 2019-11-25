import React, { Component } from 'react'
import './artical.scss'

export default class Artical extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            title:nextProps.content.title,
            text:nextProps.content.content
        }; 
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
                </h2>
                <hr/>
                <p dangerouslySetInnerHTML={ html }>
                </p>
            </div>
        )
    }
}
