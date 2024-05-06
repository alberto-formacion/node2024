import express from 'express'
import {Server} from 'socket.io'
import {createServer} from 'node:http'

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server)

let connections = 0;

io.on('connection', (socket)=>{
    connections++;
    console.log(`Hay una persona conectada, numero de personas conectadas: ${connections}`)

    socket.on('disconnect', () =>{
        connections--;
        console.log(`Alguien se ha desconectado, quedan ${connections} personas conectadas`)
    })

    socket.on('chat message', (msg) => {
        //console.log(msg)
        io.emit('chat message', msg)
    })
})

app.get('/', (req,res) =>{
    res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, ()=>{
    console.log(`El servidor esta arrancado en el puerto ${port}`)
})
