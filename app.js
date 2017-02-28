const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');

app.use('/assets', express.static(__dirname + '/public'));
app.use((req, res, next) => {
    console.log(req.path);
    next();
});
app.use(require('./controllers'));

app.listen(app.get('port'));
