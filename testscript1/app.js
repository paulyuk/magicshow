const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  const data = await readTextData();

  const responseMessage = data.toString();
  console.log("Text file response: " + data);

  res.end(responseMessage);
});

async function readTextData() {
  const fs = require('fs').promises;

  const data = await fs.readFile('../resources/textdata.txt', 'utf8')
    .catch((err) => console.error('Failed to read file', err));

  return data;
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
