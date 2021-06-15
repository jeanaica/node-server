const http = require("http");

const port = 3000;

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "text/plain");
  response.end("Hello World");
});

server.listen(port, () => console.log(`Server running on port ${port}`));
