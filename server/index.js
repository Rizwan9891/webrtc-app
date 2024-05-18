const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const server = require("http").createServer(app);
const PORT = 8000
app.use(cors());


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('./socket.io')(server, { cors: true })
server.listen(PORT, () => {
    console.log(`Backend server listening at ${PORT}`);
});