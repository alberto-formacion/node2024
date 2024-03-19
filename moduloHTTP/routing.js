const http = require('node:http')

// commonJS -> modulos clásicos de node
const peliculas = require('./peliculas/peliculas.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
        if(url==='/peliculas'){
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            return res.end(JSON.stringify(peliculas))
        }else if (url.startsWith('/peliculas/')) {
            console.log(url.split('/')[2]);
            const id = url.split('/')[2];
            console.log(id);

            const pelicula = peliculas.find(p =>{
                console.log(p)
                return p.id === id
            } );

            if (pelicula) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(pelicula));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Pelicula no encontrada');
            }
        }
        else{
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            return res.end('<h1>404</h1>')
        }
    break
    case 'POST':
      switch (url) {
        case '/peliculas': {
          let body = ''

          // escuchar el evento data
          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            peliculas.push(data);
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            res.end(JSON.stringify(data))
          })

          break
        }

        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          return res.end('404 Not Found')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
  console.log('server listening on port http://localhost:1234')
})