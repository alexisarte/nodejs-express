const mongoose = require('mongoose');
let password = "admin";
let database = "db";
mongoose.connect('mongodb+srv://alexisarte:<password>@cluster0.tqaep.mongodb.net/?retryWrites=true&w=majority');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));