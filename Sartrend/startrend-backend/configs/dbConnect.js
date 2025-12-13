const mongoose = require('mongoose');
const urll = "mongodb+srv://admin:54321@sarttrendsdb.0a7huk2.mongodb.net/?appName=SartTrendsDB";
 

const fun = async () => {
    try {
        await mongoose.connect(urll);
         console.log("Connected to MongoDB");

        //Below is collection connect, after database connect
        const collectionitems = mongoose.connection.db.collection("products");
       // console.log(collectionitems)
        const foodd = await collectionitems.find({}).toArray();

        global.fooditems = foodd;
       
        // console.log(global.fooditems); 
    } catch{
        console.log("Failed to connect to MongoDB:");
    }
}

module.exports = fun;
