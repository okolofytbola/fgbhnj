let expenses = [];
function addExpense(title, amount, category) {
    let expense = {
        id: expenses.length + 1,
        title: title,
        amount: amount,
        category: category
    };
    expenses.push(expense);
    console.log("Добавлено:", expense);
}

function printAllExpenses() {
    console.log(" РАСХОДЫ ");
    for (let i = 0; i < expenses.length; i++) {
        console.log(expenses[i]);
    }
}


function getTotalAmount() {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total = total + expenses[i].amount;
    }
    console.log("Всего потрачено:", total);
    return total;
}


function getExpensesByCategory(category) {
    let result = [];
    let total = 0;
    
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].category === category) {
            result.push(expenses[i]);
            total = total + expenses[i].amount;
        }
    }
    
    console.log("Категория:", category);
    console.log("Найдено:", result);
    console.log("Потрачено:", total);
    return result;
}


function findExpenseByTitle(text) {
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].title.toLowerCase().includes(text.toLowerCase())) {
            console.log("Найдено:", expenses[i]);
            return expenses[i];
        }
    }
    console.log("Ничего не найдено");
    return null;
}

let expenseTracker = {
    expenses: expenses,
    
    addExpense: function(title, amount, category) {
        let expense = {
            id: expenses.length + 1,
            title: title,
            amount: amount,
            category: category
        };
        expenses.push(expense);
        console.log("Ок");
    },
    
    getTotalAmount: function() {
        let total = 0;
        for (let i = 0; i < expenses.length; i++) {
            total = total + expenses[i].amount;
        }
        return total;
    },
    
    getExpensesByCategory: function(category) {
        let result = [];
        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].category === category) {
                result.push(expenses[i]);
            }
        }
        return result;
    },
    
    findExpenseByTitle: function(text) {
        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].title.toLowerCase().includes(text.toLowerCase())) {
                return expenses[i];
            }
        }
        return null;
    },
    
    deleteById: function(id) {
        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].id === id) {
                expenses.splice(i, 1);
                console.log("Удалено");
                return;
            }
        }
        console.log("Не найдено");
    },
    
    stats: function() {
        let cats = {};
        for (let i = 0; i < expenses.length; i++) {
            let cat = expenses[i].category;
            if (!cats[cat]) cats[cat] = 0;
            cats[cat] = cats[cat] + expenses[i].amount;
        }
        console.log("Статистика:", cats);
    },
    
    validateInput: function(title, amount, category) {
        if (!title || title.trim() === "") {
            console.log("Ошибка: название не может быть пустым");
            return false;
        }
        if (amount <= 0) {
            console.log("Ошибка: сумма должна быть больше 0");
            return false;
        }
        if (!category || category.trim() === "") {
            console.log("Ошибка: категория не может быть пустой");
            return false;
        }
        return true;
    },
    
    safeAddExpense: function(title, amount, category) {
        if (expenseTracker.validateInput(title, amount, category)) {
            expenseTracker.addExpense(title, amount, category);
            return true;
        }
        return false;
    }
};


addExpense("Кофе", 150, "Еда");
addExpense("Такси", 500, "Транспорт");
printAllExpenses();
getTotalAmount();
getExpensesByCategory("Еда");
findExpenseByTitle("кофе");


expenseTracker.safeAddExpense("", 100, "Еда"); 
expenseTracker.safeAddExpense("Книга", -50, "Образование");
expenseTracker.safeAddExpense("Книга", 300, "Образование"); 
expenseTracker.stats();
expenseTracker.deleteById(1);
printAllExpenses();
