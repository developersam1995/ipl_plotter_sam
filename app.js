const express = require('express');
const updateData = require('./appModules/updateData');

const app = express();

app.use(express.static('./public'));

app.get('/plotter', (req, res) => {
    res.sendfile('./index.html')
});

app.listen(3000);
console.log('listening at 3000');

// updateDate();