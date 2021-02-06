const Project = require('../models/project');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/projects');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadImgs = multer({storage: storage}).array('multiples_images',5);

//POST Project
const newProject = (req, res) => {
    //check if the Project name already exists in db
    Project.findOne({name:req.body.name},(data)=>{

        //if Project not in db, add it
        if(data===null && req.body.path!=undefined){
            //create a new Project object using the Project model and req.body
            const newProject = new Project({
                title:req.body.title,
                description: req.body.description,
                images: req.file.path,
                url_demo: req.body.url_demo,
                url_source: req.body.url_source,
                technologies: req.body.technologies
            })

            // save this object to database
            newProject.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.status(201).json(data);
            })
        //if Project is in db, return a message to inform it exists            
        }else{
            return res.status(208).json({message:"Project already exists"});
        }
    })    
};


//GET all Projects
const getAllProjects = (req, res) => {
    Project.find({}, (err, data)=>{
        if (err){
            return res.status(500).json({Error: err});
        }
        return res.json(data);
    })
};

//GET one Project
const getOneProject = (req, res) => {
    Project.find({id:id}, (err, data)=>{
        if (err || !data){
            return res.status(500).json({message: "Project not exist"});
        }
        return res.status(200).json(data);
    })
};

//DELETE one Project
const deleteOneProject = (req, res) => {
    let name = req.params.name;
    Project.deleteOne({id:id}, (err,data) => {
        if(err || !data) {
          return res.status(500).json({message: "Project doesn't exist."});
        }
        return res.status(204).json({message: "Complete delete successful"});
    })
};

//DELETE all Projects
const deleteAllProjects = (req, res) => {
    Project.deleteMany({}, err => {
        if(err) {
          return res.status(500).json({message: "Complete delete failed"});
        }
        return res.status(204).json({message: "Complete delete successful"});
    })
};

//PUT '/projects/:id'
const editOneProject = (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let images = req.body.path;
    let url_demo = req.body.url_demo;
    let url_source = req.body.url_source;
    let technologies = req.body.technologies;

    Project.findOne({id:id}, (err, data) => {
        if(err || !data) {
          return res.status(500).json(err,{message: "Project doesn't exist."});
        }
        else{
            data.title = title;
            data.description = description;
            data.images = images;
            data.url_demo = url_demo;
            data.url_source = url_source;
            data.technologies = technologies;
            data.save(err => {
                if (err) { 
                return res.json({message: "Comment failed to add.", error:err});
                }
                return res.status(200).json(data);
            }) 
        }

    })

};


//export controller functions
module.exports = {
    uploadImgs,
    getAllProjects, 
    newProject,
    deleteAllProjects,
    getOneProject,
    editOneProject,
    deleteOneProject
};
