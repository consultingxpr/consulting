const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const dbConfig = require('./config/db_config.js');
const filePagination = require('./src/routes/file');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(cors());
app.use('/uploads/', express.static(path.join(__dirname, './uploads')));
mongoose.Promise = global.Promise;


mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});
app.get('/', (req, res) => {
    res.json({ "message": " creation" });
});
app.use('/api/file', filePagination);
const userRoutes = require('./src/routes/user.routes');
app.use('/api/users', userRoutes);
const formulaireRoutes = require('./src/routes/formulaire.routes');
app.use('/api/formulaire', formulaireRoutes);
const bilanRoutes = require('./src/routes/bilan');
app.use('/api/bilan', bilanRoutes);
const etatRoutes = require('./src/routes/etat');
app.use('/api/etat', etatRoutes);
const balanceRoutes = require('./src/routes/balance');
app.use('/api/balance', balanceRoutes);
const rapportRoutes = require('./src/routes/rapport');
app.use('/api/rapport', rapportRoutes);
const adminRoutes = require('./src/routes/admin.routes');
app.use('/api/admin', adminRoutes);
const notificationRoutes = require('./src/routes/notification');
app.use('/api/notification',notificationRoutes)

const port = process.env.PORT || 4000;
app.set('port', port);
const server = http.createServer(app);
// Loading socket.io
var io = require('socket.io').listen(server);
app.io = io;
io.sockets.on('connection', function (socket) {
    console.log('A client is connected!'); 
});
// listen for requests
server.listen(port, () => {
    console.log(`Node server is listening on port ${port}`);
});