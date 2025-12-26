const router = require('express').Router();
const ExercController = require('../controllers/ExercController');

const verifyToken = require('../helpers/verify_token')

router.post('/create',verifyToken, ExercController.create)
router.get('/',verifyToken, ExercController.getAll)
router.get('/:id', ExercController.getById)
router.delete('/:id',verifyToken, ExercController.removeExercById)
router.patch('/:id',verifyToken, ExercController.updateExerc)

module.exports = router
