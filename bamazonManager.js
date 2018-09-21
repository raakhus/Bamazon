var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",


    password: "root",
    database: "bamazon_db"
});

var product = [];
var product1 = [];
var productObj = [];
var quanity = [];
var price = [];
var department = [];
var added = [];
var totalData = [];
var catagory = [];
connection.connect(function (err, res) {
    if (err) throw err;

    start();
});
function start() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        totalData.push(res)
        for (let i = 0; i < res.length; i++){
            catagory.push(res[i].department_name)
            }
    });
    console.log('Welcome Manager make some changes NOW!');
    inquirer.prompt([
        {
            name: 'list',
            type: 'list',
            message: 'What would you like to do?',
            choices: ["View Products for Sale", 'View Low Inventory', 'Add to Inventory', 'Add New Product','exit']

        }
    ]).then(function (answer) {
        switch (answer.list) {
            case "View Products for Sale":
                viewProducts();
                break;

            case 'View Low Inventory':
                viewLow();
                break;

            case 'Add to Inventory':
                addToInventory();
                break;

            case 'Add New Product':
                addNewProduct();
                break;
                case 'exit':
                return connection.end();
        }
    })

}

function viewProducts() {
    for (let i = 0; i < totalData[0].length; i++) {
        console.log("id: " + totalData[0][i].id);
        console.log("\n");
        console.log("name: " + totalData[0][i].product_name);
        console.log("\n");
        console.log("quanity: " + totalData[0][i].stock_quanity);
        console.log("\n");
        console.log("price: " + totalData[0][i].price);
        console.log("\n");
        console.log("deparment: " + totalData[0][i].department_name);
        console.log('_______________________________________');
    };
    start();
};
function viewLow() {
    for (let i = 0; i < totalData[0].length; i++) {
        if (parseInt(totalData[0][i].stock_quanity) < 5) {
            console.log("name: " + totalData[0][i].product_name + ' \nmaybe order some more!');
            console.log("\n");
            console.log('only ' + totalData[0][i].stock_quanity + ' left!');
            console.log('_______________________________________');
        };

    };
    start();
}
function addToInventory() {
    var department = catagory.reduce(function (a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
    }, []);
    inquirer.prompt([{
        name: 'department',
        type: 'list',
        message: 'What department are you ordering for?',
        choices: department

    },
    ]).then(function (answers) {
        addToDepartment(answers.department)
    })
}
function addToDepartment(x) {
    for (let i = 0; i < totalData[0].length; i++) {
        if (totalData[0][i].department_name === x) {
            product.push(totalData[0][i].product_name);
        };
    };
    inquirer.prompt([{
        name: 'product',
        type: 'list',
        message: 'What product would you like to add?',
        choices: product
    }]).then(function (answers) {
        addProduct(answers.product)
    });
}
function addProduct(x) {
    console.log(x)
    for (let i = 0; i < totalData[0].length; i++) {
        if (totalData[0][i].product_name === x) {
            quanity.push(totalData[0][i].stock_quanity);
            price.push(totalData[0][i]. price);
            product1.push(totalData[0][i].product_name);
            department.push(totalData[0][i].department_name);
        };
       
    }
   
    inquirer.prompt([{
        name: "total",
        type: "input",
        message: "how many would you like to add?",
        validate: function (value) {
            if (isNaN(value) === false && value > 0) {
                return true;
            }
            console.log('\n');
            console.log("sorry not an option");
            return false;
        }
    }]).then(function (answer) {
        totalAmount(answer.total);
    })
}
function totalAmount(x) {
    var total = parseInt(x) + parseInt(quanity[0]);
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
            stock_quanity: total
        }, {
            product_name: product1[0],
        }],
        function (err) {
            if (err) throw err;
            console.log('table updated')
            start();
        }
    );
}
function addNewProduct() {
    var department = catagory.reduce(function (a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
    }, []);
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "what's the product name?",
        },
        {
            name: "department",
            type: "list",
            message: "what department is this for?",
            choices: department
        },
        {
            name: "howMany",
            type: "input",
            message: "How many are you making?",
            validate: function (value) {
                if (isNaN(value) === false && value > 0) {
                    return true;
                }
                console.log('\n');
                console.log("sorry not an option");
                return false;
            }
        },
        {
            name: "price",
            type: "input",
            message: "what's the price?",
            validate: function (value) {
                if (isNaN(value) === false && value >0) {
                    return true;
                }
                console.log('\n');
                console.log("sorry not an option");
                return false;
            }
        }

    ]).then(function (answers) {
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answers.name,
                department_name: answers.department,
                price: answers.price,
                stock_quanity: answers.howMany
            },
            function (err) {
                if (err) throw err;
                console.log("Your product was created successfully!");

                start();
            }

        )
    });
}