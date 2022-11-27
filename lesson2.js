/*задание2
Напишите программу, которая будет принимать на вход несколько аргументов: дату и время в
формате «час-день-месяц-год». Задача программы — создавать для каждого аргумента
таймер с обратным отсчётом: посекундный вывод в терминал состояния таймеров (сколько
осталось). По истечении какого-либо таймера, вместо сообщения о том, сколько осталось,
требуется показать сообщение о завершении его работы. Важно, чтобы работа программы
основывалась на событиях.
*/
const EventEmitter = require('events');
//данная константа Moment это библиотека для работы с датами в JavaScript, по этмоу я ее использую
const moment = require('moment');
const [ dateFuture ] = process.argv.slice(2);
const DATE_FORMAT_PATTERN = 'YYYY-MM-DD HH:mm:ss';


const getFromDate= (dateString) => {
    const [ hour, day, month, year ] = dateString.split('-');

    return new Date(Date.UTC(year, month - 1, day, hour));

};

const shiwRemainingTime = (dateInFuture) => {
    const dateNow = new Date();

    if(dateNow >= dateInFuture) {
        emitter.emit('timerEnd');
    }else {
        const currentDate = moment(dateNow, DATE_FORMAT_PATTERN);
        const futuretDate = moment(dateInFuture, DATE_FORMAT_PATTERN);
        const diff = moment.preciseDiff(currentDate, futuretDate);

        console.clear();
        console.log(diff);
    }
}

const showTimer = (timerTd) => {
    clearInterval(timerTd);

}

const emitter = new EventEmitter();
const dateInFuture = getFromDate(dateFuture);
const timerId = setInterval(() => {
    emitter.emit("timerTrick", dateInFuture);
}, 1000)

emitter.on(shiwRemainingTime);
emitter.on(() => {
    showTimer(timerId)
});