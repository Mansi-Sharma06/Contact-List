const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended : true }));
app.use(express.static('assets'));

// middleware1
// app.use(function (req, res, next) {
//   req.myName = "Mansi";
//   //console.log('middleware 1 called');
//   next();
// });

// middleware2
// app.use(function (req, res, next) {
//   console.log('My name from MW2', req.myName);
//   //console.log('middleware 2 called');
//   next();
// });

var contactList = [
  {
    name: "Mansi",
    phone: "1111111111",
  },
  {
    name: "Akhil",
    phone: "1117781111",
  },
  {
    name: "VL",
    phone: "11118374911",
  }
];
  
//app.get('/', function (req, res) {
app.get("/", async (req, res) =>{
  //console.log('from the get route controller', req.myName);
  // console.log(req);
  // console.log(__dirname);
  // res.send('<h1>cool, it is running ot is it?</h1>');
  // Contact.find({}, function (err, contacts) {
  //   if (err) {
  //     console.log('error in fetching contacts from db');
  //     return;
  //   }
  //   return res.render('home', {
  //     title: "Contacts List",
  //     contact_list: contacts   //key 
  
  //   });
  
  try {
  const contacts = await Contact.find({}).exec();
  return res.render('home', {
    title: "Contacts List",
    contact_list: contacts
  });
} catch (err) {
  console.error('Error in fetching contacts from the database:', err);
  return res.status(500).send('Internal Server Error');
}
   
  });

//});

app.get('/practice', function (req, res) {
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});

// app.post('/create-contact', function (req, res) {
//     // contactList.push({
//     //     name: req.body.name,
//     //     phone: req.body.phone
//     // });

//   //contactList.push(req.body);
//   Contact.create({
//     name: req.body.name,
//     phone: req.body.phone
//   }, function (err, newContact) {
//     if (err) {
//       console.log('error in creating contact');
//       return;
//     }
//     console.log('********', newContact);
//     return res.redirect('back');
//   });
 
//     //return res.redirect('back');
// });
app.post("/create-contact", async (req, res) => {
  try {
    const newContact = await Contact.create({
      name: req.body.name,
      phone: req.body.phone,
    });
    console.log("New contact created:", newContact);
    return res.redirect("back");
  } catch (error) {
    console.error("Error in creating contact:", error);
    return res.redirect("back");
  }
});
 
// for deleting the conatact
// app.get('/delete-contact', function (req, res) {
app.get("/delete-contact", async (req, res) => {
  // console.log(req.query);
  // get the id from query int the ul 
  let id = req.query.id;

  // find the contact in the db using id and delete
  // Contact.findByIdAndDelete(id, function (err) {
  //   if (err) {
  //     console.log('error in deleting object from db');
  //     return;
  //   }
  //   return res.redirect("back");

  // });

  try {
  //const id = 'new'; // Replace with the actual ID you want to delete
  await Contact.findByIdAndDelete(id).exec();
  return res.redirect('back');
} catch (err) {
  console.error('Error in deleting object from the database:', err);
  return res.status(500).send('Internal Server Error');
}
  

  // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

  // if (contactIndex != -1) {
  //   contactList.splice(contactIndex, 1);
  // }

});



app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the server', err);
    }
    console.log('Yup! my express server is running on port:', port);
});