const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + "\n", (err)=>{
    if(err){
      console.log('Cannot do it');
    }
  });
  next();

})

hbs.registerHelper('getYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.get('/', (req, res)=>{
  //res.send('<h1>Hello Express!<h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hey there camper!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'Aboot Page',

  });
})

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: "I can't do it!"
  });
})

app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`)
});
