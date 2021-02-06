const express = require('express');
const router  = express.Router();
const projetController = require('../controllers/project');

router.get('/projects', projetController.getAllProjects);
router.post('/projects', projetController.newProject);
router.delete('/projects', projetController.deleteAllProjects);

router.get('/projects/:id', projetController.getOneProject);
router.put('/projects/:id', projetController.editOneProject);
router.delete('/projects/:id', projetController.deleteOneProject);

module.exports = router;
