import React from 'react';
import {Link} from 'react-router'


class Whoops404 extends React.Component {
    render() {
        return (
            <div id="not-found">
                <h1>Whoops...</h1>
                <p>We cannot find the page that you have requested.</p>
                <Link to="/">Join an audience</Link>
            </div>
        )
    }
}

module.exports = Whoops404;