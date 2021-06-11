const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')


const rotaHosts = require('./routes/hosts');
const rotaSeletores = require('./routes/seletores')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Acesss-Control-Allow-Header', 'Content-Type, Origin, X-Requested-With, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Acess-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).send({});

  }
  next();
})

app.use('/hosts', rotaHosts);
app.use('/seletores', rotaSeletores);


app.use((req, res, next) => {
  const erro = new Error('Rota inexistente.');
  erro.status = 404;
  next(erro)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  return res.send({
    erro: {
      mensagem: `${error.message}`
    }
  })
})
module.exports = app;
