import React, {Component} from 'react'

export default class Yield extends Component {

    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
