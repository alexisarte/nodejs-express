const mongoose = require('mongoose');
let password = "admin";
let database = "db";
mongoose.connect('mongodb+srv://alexisarte:admin@cluster0.tqaep.mongodb.net/?retryWrites=true&w=majority');
if (process.env.NODE_ENV === 'test') {
    database = "testdb";
}

// const Cat = mongoose.model('Cat', { name: String });
// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));