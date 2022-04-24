const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // '/' para que se ejecute en la raiz del proyecto
    // req es la request, la peticion
    // res es la respuesta
    console.log(req);
    res.status(200).send('Hello World!');
});

app.listen(port, () => {
    console.log('Server started at port 3000')
});