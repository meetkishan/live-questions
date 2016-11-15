import React from 'react';
import {Link} from 'react-router';
class Join extends React.Component {
    join() {
        var mamberName = this.refs.name.value;
        this.props.emit('join', {name: mamberName})
    }

    render() {
        return (
            <form action="javascript:void(0)" onSubmit={this.join.bind(this)}>
                <label>Full name</label>
                <input ref="name"
                       className="form-control"
                       placeholder="enter your full name"
                       required/><br/>
                <button className="btn btn-primary">Join</button>
                &nbsp;&nbsp;&nbsp;
                <Link to="/speaker">Join as speaker.</Link> &nbsp;&nbsp;&nbsp;
                <Link to="/board">Go to the board.</Link>
            </form>
        );
    }
}

module.exports = Join;