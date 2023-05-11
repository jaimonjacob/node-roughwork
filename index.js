const fs = require('fs');
const http = require ('http');
const url = require ('url');



fs.readFile('./txt/input.txt', 'utf-8', (err, data)=>{
    return console.log(data)
})

const http = require ('http');
const server = http.createServer((req, res) => {
    console.log(req)
    res.end ("The server is listening")
})

server.listen(3000, '127.0.0.1', ()=>{
 console.log("listening to connections on teh server")
})