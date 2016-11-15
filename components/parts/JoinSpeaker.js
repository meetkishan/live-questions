import React from 'react';

class JoinSpeaker extends React.Component {
    start() {
        var speakerName = this.refs.name.value;
        var title = this.refs.title.value;
        this.props.emit('start', {name: speakerName, title: title});
    }

    render() {
        return (
            <form action="javascript:void(0)" onSubmit={this.start.bind(this)}>
                <label>Full name</label>
                <input ref="name"
                       className="form-control"
                       placeholder="enter your full name"
                       required/>

                <label>Presentation Title</label>
                <input ref="title"
                       className="form-control"
                       placeholder="enter a title for this presentation..."
                       required/><br/>
                <button className="btn btn-primary">Start</button>
            </form>
        );
    }
}


module.exports = JoinSpeaker;