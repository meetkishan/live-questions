import React from 'react'
import {render} from 'react-dom'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'


var APP = require('./components/APP');
var Audience = require('./components/Audience');
var Speaker = require('./components/Speaker');
var Board = require('./components/Board');
var Whoops404 = require('./components/Whoops404');

var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={APP}>
            <IndexRoute component={Audience}/>
            <Route path="/speaker" component={Speaker}/>
            <Route path="/board" component={Board}/>
            <Route path="*" component={Whoops404}/>
        </Route>
    </Router>
);

render(routes, document.getElementById('react-container'));

/*
 function run() {
 ReactDOM.render(<APP />, document.getElementById('react-container'));
 }

 const loadedStates = ['complete', 'loaded', 'interactive'];

 if (loadedStates.includes(document.readyState) && document.body) {
 run();
 } else {
 window.addEventListener('DOMContentLoaded', run, false);
 }*/
