const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const MongoClient = require("mongodb").MongoClient;
const objectId = require('mongodb').ObjectID;
const url = "mongodb://localhost/jeuMultijoueur";
const dbName = "jeuMultijoueur";

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({
  secret: '1234',
  saveUninitialized: false,
  resave: false
}));
app.use(express.static(__dirname));

app.set('view engine', 'pug');



app.get('/', function (req, res) {
  res.render('acceuil');
  /* if (req.session.identifiantSession === undefined) {

    res.render('acceuil');
  } else {
    res.render('authentifié.pug', {
      niveau: req.session.niveauSession
    });
  } */
});

app.post('/traitement', function (req, res) {
  var authentification = false;
  MongoClient.connect(url, {useNewUrlParser: true}, function (error, client) {
    let db = client.db(dbName);
    db.collection('utilisateurs', function (err, collection) {
      console.log(req.body.pseudo);
      let cursor = collection.find({pseudo:req.body.pseudo});
      cursor.toArray(function (err, documents) {
        console.log(documents);
        client.close();
          if( documents[0] != undefined){
            console.log('ok');
            if (documents[0].password === req.body.password) {
              req.session.identifiantSession = 1234;
              req.session.identifiant = documents[0].pseudo;
              authentification = true;
            }
          }
          
        
        if (authentification) {
          res.render('MarioVSLuigi');
        } else {
          res.render('acceuil.pug', {
            message: 'Pseudo ou mot de passe incorrect !'
          });
        }

      });
    });
  });


});


app.get('/creation-compte', function (req, res) {
  res.render('creation-compte');
});

app.post('/creation-compte-finalisation', function (req, res) {
  MongoClient.connect(url, {useNewUrlParser: true}, function (error, client) {
    let db = client.db(dbName);
    console.log(req.body);
    var utilisateur = {
      pseudo: req.body.pseudo,
      password: req.body.password
    };
    db.collection("utilisateurs").insertOne(utilisateur, function (err) {
      client.close();
      res.render('acceuil');
    });
  });
});


app.listen(8080, "192.168.43.145");