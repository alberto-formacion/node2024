const express = require("express")
const app = express()

const port = 3000

app.get("/", (req,res)=>{
    //pese a no ponerle el content type el detecta cual deberia ser
    res.status(200).send("<h1>Mi página</h1>");
})

//se pone la ultima
app.use((req,res)=>{
    res.status(404).send("<h1>404 not found</h1>")
})

app.listen(port, ()=>{
    console.log(`server listening on port http://localhost:${port}`)
})