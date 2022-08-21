const express = require('express');
const path = require('path');
const app = express();

let user = 'admin';
let password= '123';

const cors = require('cors')

app.use(cors())


app.use(express.static(path.join(__dirname, 'public')))

app.listen(process.env.PORT, () => {
  console.log('Server is listening at: http://localhost:3000');
  
})




app.get('/login', (req,res) => {
  res.send('diza')
  

})

app.use(express.json());

app.post('/', (req,res) => {
  const {login,pass} = req.body;
  
  if(user === login && password === pass){
    console.log('przekierowanie');
    res.redirect('https://google.com')
    
  }
  
  
})