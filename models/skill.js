const mongoose = require("mongoose"); //import mongoose

// skill schema
const SkillSchema = new mongoose.Schema({
    name: {type:String, required:true},
    icon: {type:String, required:true},
});

const Skill = mongoose.model('Skill', SkillSchema); //convert to model named Skill
module.exports = Skill; //export for controller use
