const express = require('express')
const expressEjsLayout = require('express-ejs-layouts')

const app_port = process.env.PORT || 3000
const app = express()
app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use(expressEjsLayout);
app.use(express.urlencoded({extended : false}));
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));


app.listen(app_port)
console.log(`app is running. port: ${app_port}`)
console.log(`http://127.0.0.1:${app_port}/`)