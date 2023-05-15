const fs = require('fs');
const http = require ('http');
const url = require ('url');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const apiData = JSON.parse(data)
const tempOverview = fs.readFileSync(`${__dirname}/templates/temp_overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/temp_card.html`, 'utf-8');
const tempDetail = fs.readFileSync(`${__dirname}/templates/temp_product.html`, 'utf-8');

const replaceTemp = (temp, product) =>{
  let output = temp.replace(/{{PRODUCTNAME}}/g , product.productName);
  output = output.replace(/{{PRODUCTIMAGE}}/g , product.image);
  output = output.replace(/{{PRODUCTFROM}}/g , product.from);
  output = output.replace(/{{PRODUCTNUTRIENTS}}/g , product.nutrients);
  output = output.replace(/{{PRODUCTDESCRIPTION}}/g , product.description);
  output = output.replace(/{{PRODUCTQUANTITY}}/g , product.quantity);
  output = output.replace(/{{PRODUCTPRICE}}/g , product.price);
  output = output.replace(/{{PRODUCTLINK}}/g , product.id);
  if (!product.organic) output = output.replace(/{{NOTORGANIC}}/g, 'not-organic');
  return output;
} 

const server = http.createServer((req, res) => {
    
 const {query, pathname} = url.parse(req.url, true);


  if (pathname==='/' || pathname === ('/home')){
      res.end('hellow from home')
  }
  else if (pathname === ('/api')) {
    res.writeHead('200', {
      'Content-type' : 'application/json'
    })
    res.end(data)
  }
  else if (pathname === ('/overview')) {
    // PRODUCT OVERVIEW PAGE
    const cardsHTML = apiData.map(el => replaceTemp(tempCard, el)).join(''); 
    const output = tempOverview.replace(/{{PRODUCTOVERVIEW}}/g, cardsHTML);
    res.writeHead(200, {
      'Content-type': 'text/html'
    })
    res.end(output)
  }
  else if (pathname === ('/product')) {
    //PRODUCT DETAIL PAGE
    res.writeHead('200', {
      'Content-type' : 'text/html'
    })
    const product = apiData[query.id]
    const output = replaceTemp(tempDetail, product)
    console.log(product)
    res.end(output)
  }
  else {
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
