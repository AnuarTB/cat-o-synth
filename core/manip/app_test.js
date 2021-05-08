var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var xhr = new XMLHttpRequest();
let data = [
    {
      "0": ["1", "2"],
      "15": ["Q"]
    },
  
    {
      "0": ["Q", "E"]
    }
];

console.log(data);

xhr.open("POST", "http://localhost:3000/", true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

console.log(JSON.stringify(data));

xhr.send(JSON.stringify(data));