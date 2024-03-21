const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('node:crypto')
const app = express()

let isInserting = false

const peliculas = require("./json/peliculas.json")

app.use(bodyParser.json())


app.get("/peliculas", (req,res)=>{
    res.status(200).json(peliculas)
})

app.get("/peliculas/:id", (req,res)=>{
    const id = req.params.id
    const pelicula = peliculas.find(p => p.id === id)

    if(pelicula){
        res.status(200).json(pelicula)
    }else{
        res.status(404).json({"error-message": "pelicula no encontrada"})
    }
})

app.post("/peliculas", (req, res)=>{
    pelicula = req.body
    pelicula.id = generarNuevoId()
    peliculas.push(pelicula)
    res.status(201).json(pelicula)
})


app.use((req,res)=>{
    res.status(404).send("<h1>404 A donde vas??</h1>")
})

app.listen(3000, ()=>{
    console.log("Servidor arrancado http://localhost:3000")
})

/*function generarNuevoId(){
    const ids = peliculas.map(pelicula => parseInt(pelicula.id))

    return (Math.max(...ids) + 1).toString()
}*/

function generarNuevoId(){
    return crypto.randomUUID()
}