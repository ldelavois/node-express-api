const Skill = require('../models/skill');

//POST skill
const newSkill = (req, res) => {
    //check if the Skill name already exists in db
    Skill.findOne({name:req.body.name},(data)=>{

        //if skill not in db, add it
        if(data===null){
            //create a new skill object using the Skill model and req.body
            const newSkill = new Skill({
                name:req.body.name,
                icon:req.body.icon
            })

            // save this object to database
            newSkill.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.status(201).json(data);
            })
        //if skill is in db, return a message to inform it exists            
        }else{
            return res.status(208).json({message:"Skill already exists"});
        }
    })    
};


//GET all skills
const getAllSkills = (req, res) => {
    Skill.find({}, (err, data)=>{
        if (err){
            return res.status(500).json({Error: err});
        }
        return res.json(data);
    })
};

//GET one skill
const getOneSkill = (req, res) => {
    let name = req.params.name;
    Skill.find({name:name}, (err, data)=>{
        if (err || !data){
            return res.status(400).json({message: "Skill not exist"});
        }
        return res.status(200).json(data);
    })
};

//DELETE one skill
const deleteOneSkill = (req, res) => {
    let name = req.params.name;
    Skill.deleteOne({name:name}, (err,data) => {
        if(err || !data) {
          return res.status(400).json({message: "Skill doesn't exist."});
        }
        return res.status(204).json({message: "Complete delete successful"});
    })
};

//DELETE all skills
const deleteAllSkills = (req, res) => {
    Skill.deleteMany({}, err => {
        if(err) {
          return res.status(500).json({message: "Complete delete failed"});
        }
        return res.status(204).json({message: "Complete delete successful"});
    })
};


//PUT '/skills/:id'
const editOneSkill = (req, res) => {
    let name = req.body.name;
    let icon = req.body.icon;
    Skill.findOne({name: name}, (err, data) => {
        if(err || !data) {
          return res.status(500).json(err,{message: "Skill doesn't exist."});
        }
        else{
            data.name = name;
            data.icon = icon;
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
    getAllSkills, 
    newSkill,
    deleteAllSkills,
    getOneSkill,
    editOneSkill,
    deleteOneSkill
};
