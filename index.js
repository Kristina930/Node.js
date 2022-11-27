/*Решите задачу по выводу данных в консоль*/
Ответ 
/*Record 1
Record 5
Record 6
Record 2
Первое выполниться console.log('Record 1') и console.log('Record 5')
Вторые выведються как имеют приеоретет  Promise Record 6.
Третьем будет выведено setTimeout Record 2*/

console.log('Record 1');

    setTimeout(() => {
        console.log('Record 2');
    Promise.resolve().then(() => {
        setTimeout(() => {
            сonsole.log('Record 3');
    Promise.resolve().then(() => {
        console.log('Record 4');
            });
        });
    });
});

console.log('Record 5');

Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6')));





















