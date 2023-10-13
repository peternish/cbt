var express    =  require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var login =  require('./routes/loginroutes');
var handleFileRouter =  require('./routes/handlingFile');
var mcqRouter = require('./routes/mcq')
var analysisRouter = require('./routes/analysis')

require('./dbconnection');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin',"*")
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Acess-Control-Allow-Headers,Authorization,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","*");
    next();
});

var router = express.Router();

app.listen(3002,()=>{ 
    console.log("Server is Listening At Port 3002")  
})

app.get('/', (req, res) => res.send('ho!'))
//test route
app.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
app.post('/register',login.register);
app.post('/tregister',login.tregister);
app.post('/login',login.login)
app.post('/tlogin',login.tlogin)

//route to handle test data upload
app.post('/handleFile',handleFileRouter.handleFile);
app.post('/testid',handleFileRouter.checkTestId);


app.get('/mcq',mcqRouter.mcq);
app.post('/submitans', handleFileRouter.submitAns);

app.post('/generalanalysis', analysisRouter.general);
app.post('/individualanalysis', analysisRouter.individual);
app.post('/selectstudent', analysisRouter.select);
