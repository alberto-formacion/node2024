import express from 'express'
import {Server} from 'socket.io'
import {createServer} from 'node:http'
import {mongoose} from 'mongoose'
import Message from '../model/Message.js'; 

const port = process.env.PORT ?? 3000
const mongoURI = 'mongodb://localhost:27017/chat';

const app = express()
const server = createServer(app)
const io = new Server(server)

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let connections = 0;

io.on('connection', (socket)=>{
    connections++;
    console.log(`Hay una persona conectada, numero de personas conectadas: ${connections}`)

    socket.on('disconnect', () =>{
        connections--;
        console.log(`Alguien se ha desconectado, quedan ${connections} personas conectadas`)
    })

    socket.on('chat message', async (data) => {
        const mensaje = new Message({ message: data.msg, user: data.user });
        await mensaje.save();
        io.emit('chat message', data);
    })
})

app.get('/', (req,res) =>{
    res.sendFile(process.cwd() + '/client/index.html')
})

app.get('/menssages', async (req, res) => {
    try {
        const mensajes = await Message.find();
        res.json(mensajes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener todos los mensajes' });
    }
});

server.listen(port, ()=>{
    console.log(`El servidor esta arrancado en el puerto ${port}`)
})
