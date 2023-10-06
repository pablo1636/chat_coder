import express from 'express';
import handlerbars from 'express-handlebars';
import __dirname from './util.js';
import { Server } from 'socket.io';
import router from './routes/views.router.js';

const app = express();

app.engine('handlebars', handlerbars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', router);
const httpServer= app.listen(8080, ()=>{
  console.log('Servidor activo en puerto 8080');
});

const io = new Server(httpServer);
let messages = [];
io.on('connection', socket =>{
  console.log('Nuevo cliente conectado');

  socket.on('message', data=>{
    messages.push(data);
    io.emit('messageLogs', messages);

  });


})



 

