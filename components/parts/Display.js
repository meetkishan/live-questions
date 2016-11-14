var React = require('react');

var Display = React.createClass({
    render(){
        // console.log(this.props.if);
        return (this.props.if) ? <div>{this.props.children}</div> : false;
    }
});

module.exports = Display;