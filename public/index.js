const MoltinGateway = require('@moltin/sdk').gateway;
const express = require('express');

app = express();


const Moltin = MoltinGateway({
  client_id: 'vx8AxEwdfAG8qwztUGkFOc7VpnNlLSF2fcAxC6LtPw',
  client_secret: 'fCqwdEzO7SqKcbfCZnpWREdTmMM3IgiGjLABHCfTgR',
});


Moltin.Authenticate().then((response)=> {
	console.log('Authenticated', response);
});

Moltin.Cart.Items().then((cart) => {
  // console.log('Items from cart: ', cart);
});


app.get('/api/add/object', function(req,res){
	Moltin.Products.All().then((products) => {
		// Do something
		// console.log('Products: ', products.data);
		var data = products.data;
	
		for (var prod in data){
			if(data[prod].name == "Mouse"){
				Moltin.Cart.AddProduct(data[prod].id).then((cart) => {
				// Do something
				console.log('Cart: ', cart);
				res.send(cart);
				return;
			});
			}else{
				console.log('nadad');
				res.send("ERROR");
			}
		}
	});
})

var port =  process.env.port || 3000;

app.listen(port, function(){
	console.log("Port: ", port);
})
