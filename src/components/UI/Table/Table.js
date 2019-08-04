import React, {Component} from 'react';

export default class Table extends Component {

    render() {

        return (
            <table className="table table-striped">
                {this.props.children}
            </table>
        )
    }
}