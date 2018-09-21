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
function start() {
  console.log('Welcome to BAMAZON where we put the b in amazon')

  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    // console.log(res[0].id) testing respoonse
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
  var deparment = catagory.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []);



  inquirer
    .prompt({
      name: "choose",
      type: "list",
      message: "What Department would you like to search in? \n Look above to see a list of all products",
      choices: deparment
    })

    .then(function (answer) {
      console.log(totalProductInfo.length)
      switch (answer.choose) {
        case 'home supplies':
          homeSupplies();
          break;
        case 'jewelry':
          jewelry();
          break;
        case 'daily use':
          dailyUse();
          break;
        case 'clothing':
          clothing();
          break;
        case 'office supplies':
          officeSupplies();
          break;
        case 'electronics':
          electronics();
          break;
        case 'DIY':
          DIY();
          break;
      }
    })
}
function homeSupplies() {
  var product = [];
  productObj = [];
  for (let i = 0; i < totalProductInfo[0].length; i++) {
    if (totalProductInfo[0][i].department_name === 'home supplies') {
      product.push(totalProductInfo[0][i].product_name);
      product.push({
        product: totalProductInfo[0][i].product_name,
        quanity: totalProductInfo[0][i].stock_quanity,
        price: totalProductInfo[0][i].price
      });
    };
  };

inquirer.prompt(
  {
    name: "choose",
    type: "list",
    message: "What product would you like to buy?",
    choices: product

  }).then(function (answer) {
    var quanity = []
    for (let i = 0; i < productObj.length; i++) {
      if (productObj[i] === answer.choose)
        quanity.push(productObj[i].quanity)
    };
    inquirer.prompt(
      {
        name: "quanity",
        type: "input",
        message: "how many would you like to buy?",
        validate: function (value) {
          if (isNaN(value) === false && value > 0 && value < quanity[0]) {
            return true;
          }
          console.log('\n')
          console.log("sorry not an option")
          return false;
        }
      }).then(function (answer) {
        if (answer.choose)
          inquirer.prompt({
            name: "yesorno",
            type: "list",
            message: "your total cost is",
            choices: product


          })
      })
  }
}
function jewelry() {
      var product = [];
      for (let i = 0; i < totalProductInfo[0].length; i++) {
        if (totalProductInfo[0][i].department_name === 'jewelry') {
          product.push(totalProductInfo[0][i].product_name)
        }
      }
      inquirer.prompt([
        {
          name: "choose",
          type: "list",
          message: "What product would you like to buy?",
          choices: product

        },
        {
          name: "quanity",
          type: "input",
          message: "how many would you like to buy?",
          validate: function (value) {
            if (isNaN(value) === false && value > 0) {
              return true;
            }
            console.log('\n')
            console.log("sorry not an option")
            return false;
          }
        }]);
    }
function dailyUse() {
      var product = [];
      for (let i = 0; i < totalProductInfo[0].length; i++) {
        if (totalProductInfo[0][i].department_name === 'daily use') {
          product.push(totalProductInfo[0][i].product_name)
        }
      }
      inquirer.prompt([
        {
          name: "choose",
          type: "list",
          message: "What product would you like to buy?",
          choices: product

        },
        {
          name: "quanity",
          type: "input",
          message: "how many would you like to buy?",
          validate: function (value) {
            if (isNaN(value) === false && value > 0) {
              return true;
            }
            console.log('\n')
            console.log("sorry not an option")
            return false;
          }
        }]);
    }
function clothing() {
      var product = [];
      for (let i = 0; i < totalProductInfo[0].length; i++) {
        if (totalProductInfo[0][i].department_name === 'clothing') {
          product.push(totalProductInfo[0][i].product_name)
        }
      }
      inquirer.prompt([
        {
          name: "choose",
          type: "list",
          message: "What product would you like to buy?",
          choices: product

        },
        {
          name: "quanity",
          type: "input",
          message: "how many would you like to buy?",
          validate: function (value) {
            if (isNaN(value) === false && value > 0) {
              return true;
            }
            console.log('\n')
            console.log("sorry not an option")
            return false;
          }
        }]);
    }
function officeSupplies() {
      var product = [];
      for (let i = 0; i < totalProductInfo[0].length; i++) {
        if (totalProductInfo[0][i].department_name === 'office supplies') {
          product.push(totalProductInfo[0][i].product_name)
        }
      }
      inquirer.prompt([
        {
          name: "choose",
          type: "list",
          message: "What product would you like to buy?",
          choices: product

        },
        {
          name: "quanity",
          type: "input",
          message: "how many would you like to buy?",
          validate: function (value) {
            if (isNaN(value) === false && value > 0) {
              return true;
            }
            console.log('\n')
            console.log("sorry not an option")
            return false;
          }
        }]);
    }
function electronics() {
      var product = [];
      for (let i = 0; i < totalProductInfo[0].length; i++) {
        if (totalProductInfo[0][i].department_name === 'electronics') {
          product.push(totalProductInfo[0][i].product_name)
        }
      }
      inquirer.prompt([
        {
          name: "choose",
          type: "list",
          message: "What product would you like to buy?",
          choices: product

        },
        {
          name: "quanity",
          type: "input",
          message: "how many would you like to buy?",
          validate: function (value) {
            if (isNaN(value) === false && value > 0) {
              return true;
            }
            console.log('\n')
            console.log("sorry not an option")
            return false;
          }
        }]);
    }
function DIY() {
      var product = [];
      for (let i = 0; i < totalProductInfo[0].length; i++) {
        if (totalProductInfo[0][i].department_name === 'DIY') {
          product.push(totalProductInfo[0][i].product_name)
        }
      }
      inquirer.prompt([
        {
          name: "choose",
          type: "list",
          message: "What product would you like to buy?",
          choices: product

        },
        {
          name: "quanity",
          type: "input",
          message: "how many would you like to buy?",
          validate: function (value) {
            if (isNaN(value) === false && value > 0) {
              return true;
            }
            console.log('\n')
            console.log("sorry not an option")
            return false;
          }
        }]);
    }

    // )}
      // console.log(answer);
      // console.log(totalProductInfo)})}
    //   connection.query('SELECT * FROM products', function (err, res) {
    //     if (err) throw err;
    //     // console.log(res[0].id) testing respoonse
    //     for (var i = 0; i < res.length; i++) {
    //       console.log("Product: " + res[i].product_name + '\n' + 'Price: ' + (res[i].price) + "\n")
    //       catagory.push(res[i].department_name)
    //       product.push(res[i].product_name)
    // switch (answer){
    //   case answer
    // }


//     });
// }

// // function to handle posting new items up for auction
// function postAuction() {
//   // prompt for info about the item being put up for auction
//   inquirer
//     .prompt([
//       {
//         name: "item",
//         type: "input",
//         message: "What is the item you would like to submit?"
//       },
//       {
//         name: "category",
//         type: "input",
//         message: "What category would you like to place your auction in?"
//       },
//       {
//         name: "startingBid",
//         type: "input",
//         message: "What would you like your starting bid to be?",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(
//         "INSERT INTO auctions SET ?",
//         {
//           item_name: answer.item,
//           category: answer.category,
//           starting_bid: answer.startingBid,
//           highest_bid: answer.startingBid
//         },
//         function(err) {
//           if (err) throw err;
//           console.log("Your auction was created successfully!");
//           // re-prompt the user for if they want to bid or post
//           start();
//         }
//       );
//     });
// }

// function bidAuction() {
//   // query the database for all items being auctioned
//   connection.query("SELECT * FROM auctions", function(err, results) {
//     if (err) throw err;
//     // once you have the items, prompt the user for which they'd like to bid on
//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_name);
//             }
//             return choiceArray;
//           },
//           message: "What auction would you like to place a bid in?"
//         },
//         {
//           name: "bid",
//           type: "input",
//           message: "How much would you like to bid?"
//         }
//       ])
//       .then(function(answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].item_name === answer.choice) {
//             chosenItem = results[i];
//           }
//         }

//         // determine if bid was high enough
//         if (chosenItem.highest_bid < parseInt(answer.bid)) {
//           // bid was high enough, so update db, let the user know, and start over
//           connection.query(
//             "UPDATE auctions SET ? WHERE ?",
//             [
//               {
//                 highest_bid: answer.bid
//               },
//               {
//                 id: chosenItem.id
//               }
//             ],
//             function(error) {
//               if (error) throw err;
//               console.log("Bid placed successfully!");
//               start();
//             }
//           );
//         }
//         else {
//           // bid wasn't high enough, so apologize and start over
//           console.log("Your bid was too low. Try again...");
//           start();
//         }
//       });
//   });
// }
