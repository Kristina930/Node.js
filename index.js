const prnt = require('colors/safe')
const { exists } = require('fs')

const [from, to] = process.argv.slice(2).map(item => parseInt(item))

if (isNaN(from) || isNaN(to)) {
    console.log('Неправельное число')
}

let idx = 0
const colorPrint = (num) => {
    const collect = ['green', 'yellow', 'red']

    console.log(prnt[collect[idx]](num))
    if(idx === collect.length){
        idx = 0
    } else {
        idx++
    }

}

const isPrime = (num) => {
    if(num <= 1) {
        return false
    }
    let i = 2
    while(1 < num) {
        if(num % i === 0) return false
        i++
    }
    return true
}

let i = from
while(i <= to) {
    if(isPrime(i)) {
        colorPrint(i)
    }
    i++
}











