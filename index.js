const express = require("express");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const regex = /^[0-9,]+$/;

let arreglo = [];
let respuesta = {
 error: false,
 codigo: 200,
 mensaje: ''
};

app.get('/', function(req, res) {
 respuesta = {
  error: true,
  codigo: 200,
  mensaje: 'Iniciar Examen'
 };
 res.send(respuesta);
});
app.get('/arreglo', function (req, res) {
 respuesta = {
  error: false,
  codigo: 200,
  mensaje: ''
 };
 if(arreglo.length === 0) {
  respuesta = {
   error: true,
   mensaje: 'El arreglo esta vacio'
  };
 } 
 res.send(respuesta);
});

app.post('/arreglo', function (req, res) {
  if(!req.body.arreglo) {
   respuesta = {
    error: true,
    mensaje: 'El campo arreglo es requeridos'
   };
  } else if(!regex.test(req.body.arreglo)) {
    respuesta = {
     error: true,
     mensaje: 'invalid_data_format',
     arreglo: req.body.arreglo
    };
   } else {
     arreglo = req.body.arreglo;
    let suma = arreglo.reduce(function(ant, act){
      return ant + act;
    });
    let rest = arreglo.reduce(function(ant, act){
      return ant - act;
    });
  
    let mult = arreglo.reduce(function(ant, act){
      return ant * act;
    });
  
    let div = arreglo.reduce(function(ant, act){
      return ant / act;
    });
  
    respuesta = {
      error: false,
      mensaje: arreglo,
      suma: suma,
      resta: rest,
      multiplicacion: mult,
      division: div
     };
   }
  
  res.send(respuesta);
 });

app.use(function(req, res, next) {
 respuesta = {
  error: true, 
  codigo: 500, 
  mensaje: 'internal_server_error'
 };
 res.status(500).send(respuesta);
});
app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});