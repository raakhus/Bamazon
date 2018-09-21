var mysql = require("mysql");
var inquirer = require("inquirer");
var customerCash = ""

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",


  password: "root",
  database: "bamazon_db"
});


connection.connect(function (err, ) {
  if (err) throw err;

  start();
});
var catagory = []
var totalProductInfo = [];
var product = [];
var productObj = [];
var quanity = [];
var price = [];
var id = [];
var department = [];
var bought = [];
var sales = [];
function start() {
  catagory = []
  totalProductInfo = [];
  product = [];
  productObj = [];
  quanity = [];
  price = [];
  id = [];
  department = [];
  bought = [];
  sales = [];
  console.log('Welcome to BAMAZON where we put the b in amazon')

  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    // console.log(res[0].id) testing response
    totalProductInfo.push(res)
    for (var i = 0; i < res.length; i++) {
      console.log("Product: " + res[i].product_name + '\n' + 'Price: ' + (res[i].price) + "\n" + "Department: " + res[i].department_name + "\n")
      catagory.push(res[i].department_name)


    }
    askQuestions();

  });
}
function askQuestions() {
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
  })
  var department = catagory.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []);



  inquirer
    .prompt({
      name: "choose",
      type: "list",
      message: "What Department would you like to search in? \n Look above to see a list of all products",
      choices: department
    })

    .then(function (answer) {
      switch (answer.choose) {
        case 'home supplies':
          homeSupplies(answer.choose);
          break;
        case 'jewelry':
          jewelry(answer.choose);
          break;
        case 'daily use':
          dailyUse(answer.choose);
          break;
        case 'clothing':
          clothing(answer.choose);
          break;
        case 'office supplies':
          officeSupplies(answer.choose);
          break;
        case 'electronics':
          electronics(answer.choose);
          break;
        case 'DIY':
          DIY(answer.choose);
          break;
      }
    })
}
function homeSupplies(x) {
  getBamazonInfo(x);
  inquirer.prompt(
    {
      name: "choose",
      type: "list",
      message: "What product would you like to buy?",
      choices: product
    },
  ).then(function (answer) {
    specificInfo(answer.choose);
  });
};
function jewelry(x) {
  getBamazonInfo(x);
  inquirer.prompt(
    {
      name: "choose",
      type: "list",
      message: "What product would you like to buy?",
      choices: product
    },
  ).then(function (answer) {
    specificInfo(answer.choose);
  });
};
function dailyUse(x) {
  getBamazonInfo(x);
  inquirer.prompt(
    {
      name: "choose",
      type: "list",
      message: "What product would you like to buy?",
      choices: product
    },
  ).then(function (answer) {
    specificInfo(answer.choose);
  });
};
function clothing(x) {
  getBamazonInfo(x);
  inquirer.prompt(
    {
      name: "choose",
      type: "list",
      message: "What product would you like to buy?",
      choices: product
    },
  ).then(function (answer) {
    specificInfo(answer.choose);
  });
};
function officeSupplies(x) {
  getBamazonInfo(x);
  inquirer.prompt(
    {
      name: "choose",
      type: "list",
      message: "What product would you like to buy?",
      choices: product
    },
  ).then(function (answer) {
    specificInfo(answer.choose);
  });
};
function electronics(x) {
  getBamazonInfo(x);
  inquirer.prompt(
    {
      name: "choose",
      type: "list",
      message: "What product would you like to buy?",
      choices: product
    },
  ).then(function (answer) {
    specificInfo(answer.choose);
  });
};
function DIY(x) {
  getBamazonInfo(x);
  inquirer.prompt(
    {
      name: "choose",
      type: "list",
      message: "What product would you like to buy?",
      choices: product
    },
  ).then(function (answer) {
    specificInfo(answer.choose);
  });
};
function getBamazonInfo(x) {
  for (let i = 0; i < totalProductInfo[0].length; i++) {
    if (totalProductInfo[0][i].department_name === x) {
      product.push(totalProductInfo[0][i].product_name);
      productObj.push({
        product: totalProductInfo[0][i].product_name,
        quanity: totalProductInfo[0][i].stock_quanity,
        price: totalProductInfo[0][i].price,
        id: totalProductInfo[0][i].id,
        department: totalProductInfo[0][i].department_name
      });
    };
  };
}
function specificInfo(x) {
  for (let i = 0; i < productObj.length; i++) {
    if (productObj[i].product === x) {
      quanity.push(productObj[i].quanity);
      price.push(productObj[i].price);
      product.push(productObj[i].product);
      department.push(productObj[i].department);
      id.push(productObj[i].id);
    }
    if(parseInt(quanity[0]) === 0){
      console.log("we ran out! Try again!")
      return connection.end();
    }
  }
  inquirer.prompt(
    {
      name: "total",
      type: "input",
      message: "how many would you like to buy?",
      validate: function (value) {
        if (isNaN(value) === false && value > 0 && value <= parseInt(quanity[0])) {
          return true;
        }
        console.log('\n');
        console.log("sorry not an option");
        return false;
      }
    }).then(function (answer) {
      totalAmount(answer.total);
    })
}
function totalAmount(x) {
  bought.push(x)
  var total = parseInt(x) * parseInt(price[0])
  inquirer.prompt({
    name: "checkout",
    type: "list",
    message: "your Total is $" + total + " proceed with purchase?",
    choices: ["Yes", "No"]
  }).then(function(answer){
    
yesOrNo(answer.checkout);
  })
}
function yesOrNo (x){
  
  if (x === "No") {
  console.log("Already got your info you are the owner of "+bought[0]+" "+product[0])
}
console.log("You are the owner of "+bought[0]+" "+product[0])
  inquirer.prompt({
    name: "shopping",
    type: "list",
    message: "Conintue Shopping?",
    choices: ["Yes", "No"]
  }).then(function(answer){
    restartAndEnd(answer.shopping);
  })

}
function restartAndEnd (x){
  var totalStock = parseInt(quanity[0]) - parseInt(bought[0])
  if (x === "Yes") {
    console.log('need to restart it crashes')
    connection.query(
      "UPDATE products SET ? WHERE ?",
      [{
        stock_quanity: totalStock
      },{
        product_name: product[0],
      }],
      function(err) {
        if (err) throw err;
console.log('too bad it crashes')
console.log('table updated')
return connection.end();
  }
    );
  }
    connection.query(
      "UPDATE products SET ? WHERE ?",
      [{
        stock_quanity: totalStock
      },{
        product_name: product[0],
      }],
      function(err) {
        if (err) throw err;
        console.log("table updated");
console.log('See you soon!')
return connection.end();
  })
}

   
