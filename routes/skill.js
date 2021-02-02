const express = require('express');
const router  = express.Router();
const skillController = require('../controllers/skill');

router.get('/skills', skillController.getAllSkills);
router.post('/skills', skillController.newSkill);
router.delete('/skills', skillController.deleteAllSkills);

router.get('/skills/:name', skillController.getOneSkill);
router.put('/skills/:name', skillController.editOneSkill);
router.delete('/skills/:name', skillController.deleteOneSkill);

module.exports = router;
