const fs = require('fs');
const http = require ('http');
const url = require ('url');

const data = fs.readFileSync('./dev-data/data.json');
const apiData = JSON.parse(data)

const server = http.createServer((req, res) => {
    const pathName = req.url  
  if (pathName==='/' || pathName === ('/home')){
      res.end('hellow from home')
  }
  else if (pathName === ('/api')) {
    res.writeHead('200', {
      'Content-type' : 'application/json'
    })
    console.log(__dirname)
    console.log(req.url)
    res.end(data)
  }
  else if (pathName === ('/main')) {
    res.end('No main available')
  } else {
    res.writeHead(404, {
      'Content-type' : 'text/html'
    })
    res.end('<h3>Page not found</h3>')
  }
  
  
  }
)

server.listen(3000, '127.0.0.1', ()=>{
 console.log("listening to connections on teh server")
})
