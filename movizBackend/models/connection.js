var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
   
        useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://admin:azerty@cluster0-nfdwh.mongodb.net/movizapp?retryWrites=true&w=majority',
    options,    
    function(err) {
     console.log(err);
    }
   );

   module.exports = mongoose