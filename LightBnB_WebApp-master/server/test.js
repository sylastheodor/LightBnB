const { addUser, getUserWithEmail, getUserWithId } = require("./database")

// const newUser = ['a', 'a@a.com', 'a']
//  addUser(newUser).then(res => console.log(res.rows[0].id))

console.log(getUserWithEmail('a@a.com'))