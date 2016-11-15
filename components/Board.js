var React = require('react');
var Display = require('./parts/Display');
var d3 = require('d3');
var BarChart = require('react-d3-components').BarChart;
var Board = React.createClass({
    barGraphData(results){
        var data = [];
        data[0] = {label: 'a', values: []};
        Object.keys(results).forEach(function (choice) {
            data[0]['values'].push({
                x: choice,
                y: results[choice]
            });
        });
        /* // DATA Format
         var data = [{
         "label": "a",
         "values": [{"x": "a", "y": 0}, {"x": "b", "y": 0}, {"x": "c", "y": 0}, {"x": "d", "y": 0}]
         }];*/
        return data;
    },
    render(){
        return (
            <div id="scoreboard">
                <Display if={this.props.status === 'connected' && this.props.currentQuestion}>
                    <BarChart data={this.barGraphData(this.props.results)}
                              title={this.props.currentQuestion.q}
                              height={window.innerHeight * 0.6}
                              width={window.innerWidth * 0.9}
                              style="margin-top: 10, margin-bottom: 50,
                              margin-left: 50, margin-right: 10"/>
                    /*height={window.innerHeight * 0.6}
                    width={window.innerWidth * 0.9}*/
                </Display>
                <Display if={this.props.status === 'connected' && !this.props.currentQuestion}>
                    <h3>Awaiting a Question...</h3>
                </Display>
            </div>
        );
    }
});

module.exports = Board;
