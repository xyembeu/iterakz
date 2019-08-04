import React, {Component} from 'react'

export default class Content extends Component {

    render() {
        const {toggleClass} = this.props;
        return (
            <div id="page-wrapper" className={`gray-bg ${toggleClass? 'full': ''}`}>
                {this.props.children}
            </div>
        )
    }
}
