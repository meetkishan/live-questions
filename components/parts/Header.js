var React = require('react');

var Header = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired
    },
    render(){
        let status;
        if (this.props.status == 'connected') {
            status = <span className="glyphicon glyphicon glyphicon-record status connected" aria-hidden="true"></span>
        }
        else if (this.props.status == 'disconnected') {
            status =
                <span className="glyphicon glyphicon glyphicon-record status disconnected" aria-hidden="true"></span>
        }


        return (
            <header className="row">
                <div className="col-xs-10">
                    <h1>{this.props.title} </h1>
                    <p>{this.props.speaker} </p>
                </div>
                <div className="col-xs-2">
                    {status}
                </div>
            </header>
        );
    }
});

module.exports = Header;