//codigo con nodejs
//crear un servidor con node
/*
const http = require('http');

const server = http.createServer((req, res)=>{
    res.status = 200;
    res.setHeader('Content-type', 'text/plain');
    res.end('Es preciso llevar dentro de si un caos para poner en el mundo una estrella');
});

server.listen(3000, () => {
    console.log('Serve on port 3000');
});
*/

//-----------------------------------------------------------//

//codigo con express
//crear un servidor con express
const express = require('express');
const morgan = require('morgan');
//al ejecutar express me devuelve en un objeto(que es el servidor) que voy almacenar en una constante app
const app = express();

/*
//middleware. para cualquier ruta 
//con morgan importamos middleware sin tener que hacerlos como en el siguiente codigo
//los middleware funcionan para procesar datos antes de que lleguen a las rutas 
function logger(req, res, next) {
    console.log(`Route Received: ${req.protocol}://${req.get('host')}${req.originalurl}`);
    next();
}
*/

//----------------Settings---------
//app.set('nombre de la variable', 'valor de la variable)
app.set('appName', 'Imperio pomposo');
app.set('port', 3000);
app.set('view engine', 'ejs');

// ---------------Middlewares---------
app.use(express.json());
app.use(morgan('dev'));

//----------------Routes--------------
app.all('/', (req, res, next)=>{
    const data = [{name: 'Hilbert'}, {name: 'Alexander'}, {name: 'sophia'}];
    res.render('index.ejs', {matematicos: data});
});
app.all('/user', (req, res, next)=>{
    console.log('Grandes matematicos');
    next();
});
/*
app.get('/', (req, res)=>{
    res.send('El día había transcurrido del modo como suelen transcurrir estos días');
});
*/
app.get('/user', (req, res)=>{
    res.json({
        username: 'Evaristo',
        lastname: 'Galois'
    });
});
app.post('/user/:id', (req, res)=>{
    console.log(req.body);
    console.log(req.params);
    res.send('peticion POST: lo había malbaratado, lo había consumido suavemente con mi manera primitiva y extraña de vivir');
});
app.put('/user/:id', (req, res)=>{
    res.send(`User ${req.params.id} update`);
});
app.delete('/user/:id', (req, res)=>{
    res.send(`User ${req.params.id}`);
});

//middleware static(viene incluido con el express)
app.use(express.static('public'));

app.listen(5000, () => {
    console.log(app.get('appName'));
    console.log('Server on port', app.get('port'));
});