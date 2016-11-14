var express = require('express');
var path = require('path');
var http = require('http');
var _ = require('underscore');
var app = express();

var connections = [];
var title = 'Untitled Presentations';
var audience = [];
var speaker = {};
var questions = require('./app-questions');
var currentQuestion = false;
var results = {
    a: 0,
    b: 0,
    c: 0,
    d: 0
};

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

    socket.once('disconnect', function () {
        var member = _.findWhere(audience, {id: this.id});

        if (member) {
            audience.splice(audience.indexOf(member), 1);
            io.sockets.emit('audience', audience);
            console.log("Left: %s (%s audience members)", member.name, audience.length);
        } else if (this.id === speaker.id) {
            console.log("%s has left. '%s' is over", speaker.name, title);
            speaker = {};
            title = "Untitled Presentation";
            io.sockets.emit('end', {title: title, speaker: ''});
        }

        connections.splice(connections.indexOf(socket), 1);
        socket.disconnect();
        console.log("Disconnected: %s sockets remaining.", connections.length);
    });

    socket.on('join', function (payload) {
        var newMember = {
            id: this.id,
            name: payload.name,
            type: 'member'
        };
        this.emit('joined', newMember);
        audience.push(newMember);
        io.sockets.emit('audience', audience);
        console.log("Audience Joined: %s", payload.name);
    });

    //When speaker starts
    socket.on('start', function (payload) {
        speaker.name = payload.name;
        speaker.title = payload.title;
        speaker.id = this.id;
        speaker.type = 'speaker';
        this.emit('joined', speaker);
        title = speaker.title;
        io.sockets.emit('start', {title: title, speaker: speaker.name})
        console.log('Presentation started: %s by %s', title, speaker.name);
    });

    //When speaker asks questions
    socket.on('ask', function (question) {
        currentQuestion = question;
        results = {a: 0, b: 0, c: 0, d: 0};
        io.sockets.emit('ask', currentQuestion);
        console.log("Question Asked: '%s'", currentQuestion.q);
    });

    //When Audience answers the questions
    socket.on('answer', function (payload) {
        results[payload.choice]++;
        io.sockets.emit('results', results);
        console.log("Answer: '%s' - %j", payload.choice, results);
    });

    socket.emit('welcome', {
        title: title,
        audience: audience,
        speaker: speaker.name,
        questions: questions,
        currentQuestion: currentQuestion,
        results: results
    });

    connections.push(socket);
    console.log("Connected: %s sockets connected", connections.length);
});

server.on('error', onError);
server.on('listening', onListening);


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        console.log({
            message: err.message,
            error: err
        });
    });
}


function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.info('Listening on ' + bind);
}

module.exports = app;
