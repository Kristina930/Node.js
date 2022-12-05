import http from "http";
import fs from "fs";
import path from "path";
import { Server } from "socket.io";
import { Handler } from "./handler.js";
import { MyEmitter } from "./mfc.js";


const host = "localhost";
const port = 3000;

const list = [];

MyEmitter.on("connection", (payload) => list.push(Handler.send(payload)));
MyEmitter.on("disconnect", (payload) => list.push(Handler.receive(payload)));
MyEmitter.on("reconnect", (payload) => list.push(Handler.sign(payload)));


const server = http.createServer((req, res) => {
    if (["GET", "POST", "PUT"].includes(req.method)) {
        if (req.url === "/api") {
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify(list));
        }
        const filePath = path.join(process.cwd(), "index.html");
        const rs = fs.createReadStream(filePath);
        rs.pipe(res);
    }
});

const io = new Server(server)
io.on('connection', (client) => {
    console.log(client)
    console.log('Успешное подключение к серверу. Подключен новый пользователь');

    client.on('client-msg', (data) => {
        client.broadcast.emit('server-msg', { msg: data.msg })
        client.emit('server-msg', { msg: data.msg })
    })
    
})
io.on('disconnect', (client) => {
    
    console.log(client)
    console.log('Отключен пользователь');

    client.on('client-msg', (data) => {
        client.broadcast.emit('server-msg', { msg: data.msg })
        client.emit('server-msg', { msg: data.msg })
    })
})
io.on('reconnect', (client) => {
    console.log(client)
    console.log('пользователь переподключаеться');

    client.on('client-msg', (data) => {
        client.broadcast.emit('server-msg', { msg: data.msg })
        client.emit('server-msg', { msg: data.msg })
    })
})


server.listen(port, host, () => {
    console.log({ result: `Сервер запущен: ${host}${port}` })
})

