import http from "http";


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('¡Mi primer hola mundo desde el backend!');
});

server.listen(8080, 'localhost', () => {
  console.log('Servidor escuchando en http://localhost:8080/');
});

