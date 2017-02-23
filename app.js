const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');

app.use('/assets', express.static(__dirname + '/public'));
app.use(require('./controllers'));
app.use((req, res, next) => {
    console.log(req.path);
    next();
});

app.listen(app.get('port'));
