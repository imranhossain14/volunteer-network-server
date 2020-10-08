const express = require('express')
const bodyParser= require('body-parser')
const cors = require('cors')

const port = 5000

// Make ready app for use with express , cors and bodyParser

const app = express()
// nicher duita middlewire client and server er access er permission diche(cros) r body er data gula pares(bodyparse) kore json akare niye astese
app.use(cors())
app.use(bodyParser.json())


// Database connection configuration here

const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://volunteer-imran:imran123456@cluster0.jsbl6.mongodb.net/volunteer?retryWrites=true&w=majority"
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.giumd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const eventsCollection = client.db("volunteer").collection("volunteerEvents");
  // perform actions on the collection object
    
  // client ja post korbe tar request r server end a ja kaj kora hobe tar response pathabo
  //Create er jah CRYD er
        app.post('/addEvent',(req, res) =>{
        //client er body te ja ase tra reead korte body use kora hoy, seta parese kore ana lage body parser diye.
        // client and server jodi same jaigay na thake ba same ip address a na thake tahole cross origin er ekta conflict hoy. setar permission dite hobe cros diye
        const newBooking = req.body;
        //database a save korar jonno
        // bookings.insertOne(newBooking)
        console.log(newBooking);
        eventsCollection.insertMany(newBooking )
        
        .then(result => {
                console.log(result);
            // jodi kisu ekta insert successful hoy tahole tumi kisu ekta insert korso
                res.send(result.insertedCount>0)

        })
        .catch(error=>{
            console.log(error);
        })
        process.on('unhandledRejection', (reason, promise) => {
            console.log('Unhandled Rejection at:', promise, 'reason:', reason);
            // Application specific logging, throwing an error, or other logic here
          });
          
          
  })


  app.get('/events', (req, res)=>{
    //   const events = req.body;
      eventsCollection.find({})
      .toArray((err,documents)=>{
          res.send(documents)
      })
  })

  app.get('/event/:id', (req, res)=>{
      eventsCollection.find({_id: ObjectId(req.params.id)})
      .toArray((err,documents)=>{
          res.send(documents[0]);
      })
  })

  app.post('/registration', (req, res)=>{
      const volunteer = req.body;
      volunteerCollection.insertOne(volunteer)
      .then(result => {
          res.send(result.insertedCount > 0)
      })
  })

  app.get('/userevent',(req, res)=>{
    //   console.log(req.query.email);
    volunteerCollection.find({email: req.query.email})
    .toArray((err,documents)=>{
        res.send(documents);
    })
  })


  app.delete('/delete/:id', (req, res) => {
    volRegisterCollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0);
      })
  })

  
  app.delete('/deleteRegisteredTask/:id', (req, res) => {
    volRegisterCollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0);
      })
  })
  
});



app.get('/', (req, res) => {
  res.send('My Code is Working!!!!')
})




  // READ of CRUD. API create
        // app.get('/bookings', (req, res)=>{
        //     // email jeta diye logged in ase seta capture kortesi
        //     console.log(req.query.authorization);
        //     // by deafult sobike pete {} dibo inside a
        //     bookings.find({email: req.query.email})
        //     .toArray((err, documents)=>{
        //         res.send(documents);
        //     })
        // })
  




// });






app.get('/', (req, res) => {
    res.send('My Code is Working!!!!')
  })

// app.listen(port, () => {
  
// })
app.listen(process.env.Port || port)