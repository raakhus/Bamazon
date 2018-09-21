// var names = ["Mike","Matt",'Mike',"Nancy","Adam","Jenny","Nancy","Carl",'Carl'];

// var uniq = names.reduce(function(a,b){
//     if (a.indexOf(b) < 0 ) a.push(b);
//     return a;
//   },[]);

// console.log(uniq, names)
var inquirer = require("inquirer");
function wowigay() {
    inquirer
        .prompt({
            name: "choose",
            type: "confirm",
            message: "yes or no",
            }).then(function(answer){
                console.log(answer)
                wowigay();
            })
    }
    wowigay();