const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ShipApp_db', {
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});