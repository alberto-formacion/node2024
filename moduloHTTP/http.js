const http = require('node:http') // protocolo HTTP

const port = 3000

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})


server.listen(port, () => {
  console.log(`server listening on port http://localhost:${port}`)
})
