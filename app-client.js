import React from 'react'
import {render} from 'react-dom'
import APP from './components/APP';
import Audience from './components/Audience';
import Speaker from './components/Speaker';
import Board from './components/Board';
import Whoops404 from './components/Whoops404';

import {Router, Route, hashHistory, IndexRoute} from 'react-router'


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
