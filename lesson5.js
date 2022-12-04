import http from 'http';
import fs from 'fs';
import path from 'path';


const host = 'localhost';
const port = 3000;

const fs = fs.promises;

const server = http.createServer((request, response) => {
    if (request.method === 'GET') {
        const url = request.url.split('?')[0];
       // console.log(url)
        const curPath = path.join(process.cwd(), url);

        fs.stat(curPath, (err, stats) => {
            if(!err) {
                if(stats.ifFile(curPath)) {
                    const readStream = fs.createReadStream(curPath, 'utf-8');
                    readStream.pipe(response);
                }else {
                    fs
                    .reddir(curPath)
                    .then((files) => {
                        return files;
                    })
                    .then((data) => {
                        const filePath = path.join(process.cwd(), './lesson5.html');
                        const readStream = fs.createReadStream(filePath);
                        readStream.on(data, callback, (chunk) => {
                            console.log(chunk)
                            res.write(chunk)
                        })
                        readStream.on('end', () => {
                            res.end()
                        })
                        callback();
                    });
                } 
            } else {
                result = 'Нет пути, его не существует'; 
            }
            response.end(result)
        });
    }
});

server.listen(port, host, () => 
    console.log(`Сервер работает на http://${host}:${port}`)
    )