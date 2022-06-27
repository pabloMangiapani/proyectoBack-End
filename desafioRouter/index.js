const express = require ('express') ;
const app = express();
const PORT = 8080;
const bodyParser = require ('body-parser');
const routes = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}));
app.use(express.static('public'));
app.use("/api", routes.products);

app.post('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);
})