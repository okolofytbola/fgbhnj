const users = [
{ id: 1, name: "Anna", age: 22, city: "Moscow", isActive: true },
{ id: 2, name: "Oleg", age: 17, city: "Kazan", isActive: false },
{ id: 3, name: "Ivan", age: 30, city: "Moscow", isActive: true },
{ id: 4, name: "Maria", age: 25, city: "Sochi", isActive: false }
];


let getActiveUsers = users.filter(function(user){
    return user.isActive === true;
});

console.log(getActiveUsers);

let getUserNames = users.map(user=>{
    return user.name
});
console.log(getUserNames)



function findUserById(users,id){
    let foundUser = users.find(function(user){
        return user.id=== id;

    });
    return foundUser|| null;
}
console.log(findUserById(users,2));
console.log(findUserById(users,10));



function getUsersStatistics(users){
    let activeUsers = users.filter(function(user){
        return user.isActive===true;
    });
    let inactiveUsers = users.filter(function(user){
        return user.isActive===false
    });
    return{
        total:users.length,
        active: activeUsers.length,
        inactive: inactiveUsers.length
    }
}
console.log(getUsersStatistics(users));

function getAverageAge(users) {
    let totalAge = users.reduce(function(sum, user) {
        return sum + user.age;
    }, 0);
    
    return totalAge / users.length;
}

function groupUsersByCity(users) {
    return users.reduce(function(result, user) {
        let city = user.city;
        
        if (!result[city]) {
            result[city] = [];
        }
        
        result[city].push(user);
        return result;
    }, {});
}

console.log(groupUsersByCity(users));


   