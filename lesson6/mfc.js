import EventEmitter from "events";

const requestTypes = [
    {
        type: 'connection',
        payload: 'Подключен '
    },
    {
        type: 'disconnect',
        payload: 'Отключен '
    },
    {
        type: 'sreconnect',
        payload: ' переподключаеться'
    },
]

class Users {
    constructor(params) {
        this.type = params.type
        this.payload = params.payload
    }
}

const genereteRangeUsers = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

const generateUsers = () => {
    const intervalValue = genereteRangeUsers(1, 5) * 1000
    const params = requestTypes[genereteRangeUsers(0, 2)]

    return delay(intervalValue).then(() => new Users (params))
}

const emitter = new class extends EventEmitter {}

export { emitter as MyEmitter }

const run = async () => {
    const user = await generateUsers()
    emitter.emit(user.type, user.payload)

    run()
}
run()