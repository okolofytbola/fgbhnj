let expenses = [];
let currentIndex = 0;

function addExpense(expenses, title, amount, category) {
    let expense = {
        id: expenses.length + 1,
        title: title,
        amount: amount,
        category: category
    };
    expenses.push(expense);
    alert("ДОБАВЛЕНО: " + title + " - " + amount + "₽ (" + category + ")");
    return expenses;
}

function printAllExpenses(expenses) {
    if (expenses.length === 0) {
        alert("Расходов нет");
    } else {
        let message = "ПОЛНЫЙ СПИСОК РАСХОДОВ:\n\n";
        for (let i = 0; i < expenses.length; i++) {
            message = message + expenses[i].id + ". " + expenses[i].title + " - " + expenses[i].amount + "₽ ( " + expenses[i].category + ")\n";
        }
        alert(message);
    }
}

function getTotalAmount(expenses) {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total = total + expenses[i].amount;
    }
    alert("ОБЩАЯ СУММА: " + total + " ₽");
    return total;
}

function getExpensesByCategory(expenses, category) {
    let result = [];
    let total = 0;
    
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].category.toLowerCase() === category.toLowerCase()) {
            result.push(expenses[i]);
            total = total + expenses[i].amount;
        }
    }
    
    if (result.length === 0) {
        alert("Расходов в категории \"" + category + "\" нет");
    } else {
        let message = "РАСХОДЫ В КАТЕГОРИИ \"" + category + "\":\n\n";
        for (let i = 0; i < result.length; i++) {
            message = message + result[i].title + " - " + result[i].amount + "₽\n";
        }
        message = message + "\nВСЕГО: " + total + " ₽";
        alert(message);
    }
    return result;
}

function findExpenseByTitle(expenses, text) {
    let found = false;
    let message = "ПОИСК: \"" + text + "\"\n\n";
    
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].title.toLowerCase().includes(text.toLowerCase())) {
            message = message + "Найдено: " + expenses[i].title + " - " + expenses[i].amount + "₽ ( " + expenses[i].category + ")\n";
            found = true;
        }
    }
    if (!found) {
        message = message + "Ничего не найдено";
    }
    alert(message);
}

function deleteExpenseById(expenses, id) {
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].id === id) {
            let deleted = expenses[i].title + " - " + expenses[i].amount + "₽";
            expenses.splice(i, 1);
            alert("УДАЛЕНО: " + deleted);
            return;
        }
    }
    alert("Расход с ID " + id + " не найден");
}

function printCategoryStats(expenses) {
    let cats = {};
    for (let i = 0; i < expenses.length; i++) {
        let cat = expenses[i].category;
        if (!cats[cat]) cats[cat] = 0;
        cats[cat] = cats[cat] + expenses[i].amount;
    }
    
    if (Object.keys(cats).length === 0) {
        alert("Нет данных для статистики");
    } else {
        let message = "СТАТИСТИКА ПО КАТЕГОРИЯМ:\n\n";
        for (let cat in cats) {
            message = message + cat + ": " + cats[cat] + " ₽\n";
        }
        alert(message);
    }
}

function validateInput(title, amount, category) {
    if (!title || title.trim() === "") {
        alert("ОШИБКА: Название не может быть пустым");
        return false;
    }
    if (amount <= 0) {
        alert("ОШИБКА: Сумма должна быть больше 0");
        return false;
    }
    if (!category || category.trim() === "") {
        alert("ОШИБКА: Категория не может быть пустой");
        return false;
    }
    return true;
}

function safeAddExpense(expenses, title, amount, category) {
    if (validateInput(title, amount, category)) {
        addExpense(expenses, title, amount, category);
        return true;
    }
    return false;
}

function nextExpense(expenses) {
    if (expenses.length === 0) {
        alert("Нет расходов");
        return;
    }
    currentIndex = currentIndex + 1;
    if (currentIndex >= expenses.length) {
        currentIndex = 0;
    }
    showCurrentExpense(expenses);
}

function previousExpense(expenses) {
    if (expenses.length === 0) {
        alert("Нет расходов");
        return;
    }
    currentIndex = currentIndex - 1;
    if (currentIndex < 0) {
        currentIndex = expenses.length - 1;
    }
    showCurrentExpense(expenses);
}

function showCurrentExpense(expenses) {
    let e = expenses[currentIndex];
    alert("ТЕКУЩИЙ РАСХОД " + (currentIndex + 1) + "/" + expenses.length + ":\n" +
          e.id + ". " + e.title + " - " + e.amount + "₽ (" + e.category + ")");
}

function showMenu() {
    let menu = "ТРЕКЕР РАСХОДОВ\n\n";
    menu = menu + "1. Добавить расход\n";
    menu = menu + "2. Показать все расходы\n";
    menu = menu + "3. Показать общую сумму\n";
    menu = menu + "4. Показать расходы по категории\n";
    menu = menu + "5. Найти расход по названию\n";
    menu = menu + "6. Удалить расход по ID\n";
    menu = menu + "7. Статистика по категориям\n";
    menu = menu + "8. Следующий расход\n";
    menu = menu + "9. Предыдущий расход\n";
    menu = menu + "0. Выход\n\n";
    menu = menu + "Введите номер действия:";
    return prompt(menu);
}

const expenseTracker = {
    expenses: expenses,
    
    addExpense: function(title, amount, category) {
        return safeAddExpense(expenseTracker.expenses, title, amount, category);
    },
    
    printAllExpenses: function() {
        return printAllExpenses(expenseTracker.expenses);
    },
    
    getTotalAmount: function() {
        return getTotalAmount(expenseTracker.expenses);
    },
    
    getExpensesByCategory: function(category) {
        return getExpensesByCategory(expenseTracker.expenses, category);
    },
    
    findExpenseByTitle: function(text) {
        return findExpenseByTitle(expenseTracker.expenses, text);
    },
    
    deleteExpenseById: function(id) {
        return deleteExpenseById(expenseTracker.expenses, id);
    },
    
    printCategoryStats: function() {
        return printCategoryStats(expenseTracker.expenses);
    },
    
    nextExpense: function() {
        return nextExpense(expenseTracker.expenses);
    },
    
    previousExpense: function() {
        return previousExpense(expenseTracker.expenses);
    },
    
    start: function() {
        alert("ДОБРО ПОЖАЛОВАТЬ В ТРЕКЕР РАСХОДОВ");
        
        let running = true;
        
        while (running) {
            let choice = showMenu();
            
            switch(choice) {
                case "1":
                    let title = prompt("Введите название расхода:");
                    let amount = Number(prompt("Введите сумму:"));
                    let category = prompt("Введите категорию:");
                    expenseTracker.addExpense(title, amount, category);
                    break;
                    
                case "2":
                    expenseTracker.printAllExpenses();
                    break;
                    
                case "3":
                    expenseTracker.getTotalAmount();
                    break;
                    
                case "4":
                    let cat = prompt("Введите категорию для поиска:");
                    expenseTracker.getExpensesByCategory(cat);
                    break;
                    
                case "5":
                    let search = prompt("Введите текст для поиска:");
                    expenseTracker.findExpenseByTitle(search);
                    break;
                    
                case "6":
                    let id = Number(prompt("Введите ID расхода для удаления:"));
                    expenseTracker.deleteExpenseById(id);
                    break;
                    
                case "7":
                    expenseTracker.printCategoryStats();
                    break;
                    
                case "8":
                    expenseTracker.nextExpense();
                    break;
                    
                case "9":
                    expenseTracker.previousExpense();
                    break;
                    
                case "0":
                    alert("ДО СВИДАНИЯ!");
                    running = false;
                    break;
                    
                default:
                    alert("ОШИБКА: Введите число от 0 до 9");
            }
        }
    }
};

expenseTracker.start();
