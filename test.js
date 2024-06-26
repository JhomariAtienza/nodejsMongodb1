const name = 'Jose'
let age = 29
const hasHobbies = true

age = 30

// function summarizeUser(userName, userAge, userHasHobby) {
//     return ('Name is ' + userName + ', age is ' + userAge + ' and the user has hobbies: ' + userHasHobby)
// }

// const summarizeUser = function(userName, userAge, userHasHobby) {
//     return ('Name is ' + userName + ', age is ' + userAge + ' and the user has hobbies: ' + userHasHobby)
// }

// const summarizeUser = (userName, userAge, userHasHobby) => {
//     return ('Name is ' + userName + ', age is ' + userAge + ' and the user has hobbies: ' + userHasHobby)
// }

// const add = (a,b) => a + b
// const addOne = a => a + 1
const addRandom = () => 1 + 2

// console.log(addRandom())
// console.log(summarizeUser(name, age, hasHobbies))

// this.name = 'Mico'
const person = {
    name:'Mark',
    age:29,
    greet: function() {
        console.log('Hi, I am ' + this.name)
    }
}

// person.greet()

// Array
const hobbies = ['Sports', 'Cooking']

const copiedArray = [...hobbies]

// for(let hobby of hobbies) {
//     console.log(hobby)
// }
// console.log(hobbies.map(hobby => 'Hobby: ' + hobby))
// hobbies.push('Dancing')
// console.log(hobbies)

const toArray = (a, b,...args) => {
    return args
}

const copiedPerson = {...person}
// console.log(toArray(1,2,3,4,5,6))
// console.log(copiedArray)
// console.log(copiedPerson)

const {name:n, age:a} = person

// console.log(a)

const [hobby1] = hobbies
// console.log(hobby1)

const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!')
        }, 1500)
    })
    return promise
}

// setTimeout(() => {
//     console.log('Timer done!')
//     let a = null
//     .then(data => {
//         console.log(data)
//         return fetchData()
//     })
//     .then(data2 => {
//         console.log(data2)
//     })
//     console.log(a)
// }, 2000)

const asynfun = async() => {
    const a = await fetchData()
    console.log(a)
}

asynfun()
console.log('Hi')