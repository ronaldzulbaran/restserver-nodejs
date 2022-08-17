
const { Router } = require('express');
const { getExample, storeExample, updateExample, deleteExample } = require('../controllers/example.controller');

const router = Router();


router.get('/', getExample)

router.post('/', storeExample)

router.put('/:id', updateExample)

router.delete('/', deleteExample)


module.exports = router;