var names = ["Mike","Matt",'Mike',"Nancy","Adam","Jenny","Nancy","Carl",'Carl'];

var uniq = names.reduce(function(a,b){
    if (a.indexOf(b) < 0 ) a.push(b);
    return a;
  },[]);

console.log(uniq, names)