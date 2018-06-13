const  express = require('express');
const hbs = require('hbs');
var app = express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
const port = process.env.PORT || 3000;
app.use((req,res,next) => {
  var now = new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  next();
});

app.use((req,res,next) => {
  res.render('maintanence.hbs');
  next();
});

hbs.registerHelper('getCurrentYear' , () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt' , (text) => {
  return text.toUpperCase();
})

app.get('/',(req,res) => {
  res.render('home.hbs' ,{
    pageTitle : 'Home Page',
    welcomeMessage: 'Welcome to my page'
  });
});


app.get('/about',(req,res) => {
  res.render('about.hbs' , {
    pageTitle :  'About Page'
  });
});

app.get('/bad',(req,res) => {
  res.send({
    "errorMessage":"Unable to Connect!"
  });
});
app.listen(port);
