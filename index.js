
/*По ссылке вы найдёте файл с логами запросов к серверу весом более 2 Гб. Напишите программу,
которая находит в этом файле все записи с ip-адресами  и 34.48.240.111, а также
сохраняет их в отдельные файлы с названием %ip-адрес%_requests.log*/


const fs = require('fs');
const readline = require('readline');

const readFile = fs.createReadStream('access_tmp.log', 'utf-8');

const ip1 = '89.123.1.41';
const ip2 = '34.48.240.111';

const file1 = fs.createReadStream(`${ip1}`);
const file2 = fs.createReadStream(`${ip2}`);

let numberStr = 0;

const fileLine = readline.createInterface({
    input: readFile
})

fileLine.on('line', (line) => {
    if (line.includes(ip1)) {
        file1.write(line + '\n')
    }
    if (line.includes(ip2)) {
        file2.write(line + '\n')
    }

    console.log(++numberStr);
})





















