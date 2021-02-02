const express = require('express');
const router  = express.Router();
const skillController = require('../controllers/skill');

router.get('/skills', skillController.getAllSkills);
router.post('/skills', skillController.newSkill);
router.delete('/skills', skillController.deleteAllSkills);

router.get('/skills/:id', skillController.getOneSkill);
router.delete('/skills/:id', skillController.deleteOneSkill);

module.exports = router;
