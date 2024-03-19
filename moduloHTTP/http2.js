const http = require('node:http') // protocolo HTTP
const fs = require('node:fs')

const port = 3000

const routing = (req, res) => {
    /*
        text/html
        image/jpeg (.jpg, .jpeg, .jfif, .pjpeg, .pjp)
        video/mp4
        audio/mpeg
        application/pdf
    */
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.end('<h1>Página de INICIO</h1>')
  } else if (req.url === '/imagen') {
    fs.readFile('./goku.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.end('<h1>acortazar@centrosanluis.com</h1>')
  } else {
    res.statusCode = 404 // Not Found
    res.end('<h1>404</h1>')
  }
}

const server = http.createServer(routing)

server.listen(port, () => {
  console.log(`El servidor esta escuchando http://localhost:${port}`)
})