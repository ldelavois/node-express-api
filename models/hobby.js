const mongoose = require("mongoose"); //import mongoose
// hobby schema
const HobbySchema = new mongoose.Schema({
    name: {
        en: {type:String, required:true},
        fr: {type:String, required:true}
    },
    icon : {type:String, required:true}
});

const Hobby = mongoose.model('Hobby', HobbySchema); //convert to model named hobby
module.exports = hobby; //export for controller use