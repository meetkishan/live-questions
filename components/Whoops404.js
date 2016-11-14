var React = require('react');
import { Link } from 'react-router'


var Whoops404 = React.createClass({
   render(){
       return(
           <div id="not-found">
               <h1>Whoops...</h1>
               <p>We cannot find the page that you have requested.</p>
               <Link to="/">Join an audience</Link>
           </div>
       )
   }
});

module.exports = Whoops404;