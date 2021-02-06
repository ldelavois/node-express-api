const mongoose = require("mongoose"); //import mongoose
// project schema
const ProjectSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    images: {type:Array, required:true},
    url_demo: {type:String},
    url_source: {type:String},
    technologies: {type:Array, required:true}
});

const Project = mongoose.model('Project', ProjectSchema); //convert to model named Project
module.exports = Project; //export for controller use