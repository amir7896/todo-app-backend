const express     = require('express');

const cors = require('cors');
const mongoose    = require('./db');
const routes = require('./routes/routes');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:4200'}));

app.use('/todos' , routes);

app.listen(3000 , () =>{
    console.log('Server Start On Port 3000');
})




