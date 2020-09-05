const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

const server = http.createServer(app).listen(3000);