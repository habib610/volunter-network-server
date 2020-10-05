const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const pass = 'Tb6vYdXtPK4vAHkg';

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res)=>{
    res.send("This is Server Side")
})



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://volunteer1:Tb6vYdXtPK4vAHkg@cluster0.4zcwe.mongodb.net/volunterNetwork?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("volunterNetwork").collection("events");
  // perform actions on the collection object

  // 1st step create
  app.post('/newVolunteer', (req, res)=>{
    const newVolunteer = req.body;
    collection.insertOne(newVolunteer)
    .then(result =>{
      res.send(result.insertedCount > 0)
    })
  })

  // 2nd step read
  app.get('/allactivities', (req, res)=>{
    console.log(req.query.email)
    collection.find({username: req.query.email})
    // collection.find({})
    .toArray((err, documents)=>{
      res.send(documents)
      console.log("ok")
    })
  })
  app.delete('/delete/:id', (req,res)=>{
    console.log(req.params.id)
    collection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result=>{
      // res.redirect('/')
    })
  })

//   client.close();
});


app.listen(4000, ()=> console.log("Awesome! Everything Looks Good!!!"))