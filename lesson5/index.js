const http = require('http');
const path = require('path');
const fs = require('fs');
const { Transform } = require ("stream");



const host = "localhost";
const port = 3000;

const fsp = fs.promises;

const div = (arr, curUrl) => {
  if (curUrl.endsWith("/")) curUrl = curUrl.substring(0, curUrl.length - 1);
  let h2 = "";
  for (const item of arr) {
    h2 += `<h2><a href="${curUrl}/${item}">${item}</a></h2>`;
  }
  return h2;
};

const server = http.createServer((request, response) => {
  if (request.method === "GET") {
    const url = request.url.split("?")[0];
    const curPath = path.join(process.cwd(), url);

    fs.stat(curPath, (err, stats) => {
      if (!err) {
        if (stats.isFile(curPath)) {
          readStream .pipe(response);
        } else {
          fsp
            .readdir(curPath)
            .then((data) => {
              const filePath = path.join(process.cwd(), "./index.html");
              const readStream  = fs.createReadStream(filePath, {encoding: 'utf-8', highWaterMark: 64});
              const transform = new Transform({
                transform(chunk, encoding, callback) {
                  const h2 = div(data, url);
                  this.push(chunk.toString().replace("#div#", h2));

                  callback();
                },
              });

              readStream .pipe(transform).pipe(response);
            });
        }
      } else {
        response.statusCode = 405;
        response.end("Метод не разрешен");
      }
    });
  }
});

server.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}`)
);


