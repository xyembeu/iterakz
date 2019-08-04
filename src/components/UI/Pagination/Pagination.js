import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends Component {
    static defaultProps = {
        by: 10
    };
    static propTypes = {
        by: PropTypes.number.isRequired,
        current: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        onPaginate: PropTypes.func.isRequired
    };

    render() {
        const {count, by, current, onPaginate} = this.props;

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(count / by); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <button key={number} className="btn btn-white" onClick={() => onPaginate(number)}>{number}</button>
            );
        });

        return (
            <div className="clearfix">
                <div className="btn-group pull-right">
                    {(current !== 1 && pageNumbers.length > 1) ?
                        <button
                            className="btn btn-white"
                            onClick={() => onPaginate(current - 1)}>
                            Пред
                        </button>
                        : null}
                    {(pageNumbers.length > 1) ? renderPageNumbers : null}
                    {(current !== pageNumbers.length && pageNumbers.length > 1) ?
                        <button
                            className="btn btn-white"
                            onClick={() => onPaginate(current + 1)}>
                            След
                        </button>
                        : null}
                </div>
            </div>
        )
    }
}

