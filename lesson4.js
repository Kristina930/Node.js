/*Примените полученные знания к программе, которую вы написали на прошлом уроке.
Для этого превратите её в консольное приложение, по аналогии с разобранным примером, и добавьте
следующие функции:
1. Возможность передавать путь к директории в программу. Это актуально, когда вы не хотите
покидать текущую директорию, но надо просмотреть файл, находящийся в другом месте.
2. В директории переходить во вложенные каталоги.
3. Во время чтения файлов искать в них заданную строку или паттерн
*/

const readline = require('readline');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const findInDir = (__dirname) => {
    return fs
    .readdir(__dirname)
    .then((choices) => {
        return inquirer.prompt([
            {
                name: "fileName",
                type: "list",
                message: "Выбираем файл",
                choices,
            },
        ]);
    })
    .then(async({fileName}) => {
        const fullPath = path.join(__dirname, fileName);
        const stat = await fs.stat(fullPath);
        if(!stat.isFile()) {
            return findInDir(fullPath);
        }
        return Promise.all([
            fs.readFile(path.join(__dirname, fileName), "utf-8"),
        ]);
    })
    .then((result) => {
        if (result) {
            const [text] = result;
            let count = 0;
            const out = text.replace(pattern, () => {
                count++;
            });

            console.log(out)
        }
    });
};

rl.question(

    (dirPath) => {
        const dirName = path.join(root, dirPath);

        findInDir(dirName);
    }
);

rl.on("close", () => process.exit(0));
