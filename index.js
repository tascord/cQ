
const fs = require('fs');
const db = require('quick.db');
const bp = require('body-parser');

// ————————————————————————————————— //

const app  = require('express')();
const http = require('http').createServer(app);
const io   = require('socket.io')(http);

// Settings
app.set('view engine', 'ejs');
app.set('views', __dirname + '/pages');

// Body parsing for POST requests
app.use(bp.json())

// Start the server.
http.listen(3000, () => console.log('Started!'));

// ————————————————————————————————— //

app.get('*', (req, res) => {

    // Remove the '/' from the beginning of the path.
    let path = req.path.slice(1);

    // Default to /index route.
    if(!path) path = 'index';

    // Non-page stuff like CSS & images.
    if(path.startsWith('p/')) {

        // Trim the '/p' from the start.
        path = path.slice(2);

        // If the file exists, send it.
        if(fs.existsSync(`./public/${path}`)) return res.sendFile(`${__dirname}/public/${path}`);

        // Otherwise, send a 404.
        return res.status(404).end();

    }

    // If the page exists, render it.
    if(fs.existsSync(`./pages/${path}.ejs`)) return res.render(`${path}.ejs`);

    // Otherwise render a 404.
    return res.render('404.ejs');

});

// ————————————————————————————————— //

app.post('*', (req, res) => {

    // Remove the '/' from the beginning of the path.
    let path = req.path.slice(1);

    switch(path) {

        // Form responses
        case "submit":

            console.log(req.body.id);

            // db.push(``)
            res.status(204).end();

        break;

        // Something we're not handling
        default:
            res.status(404).end();
        break;

    }

});

// ————————————————————————————————— //

io.on('connect', (socket) => {

    socket.emit('hello my child');

});