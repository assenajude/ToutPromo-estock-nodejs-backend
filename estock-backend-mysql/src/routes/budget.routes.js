const budgetCtrl = require('../controllers/budget.controller');
const express = require('express');
const router = express.Router();

router.post('/', budgetCtrl.createBudget);
router.get('/', budgetCtrl.getAllBudgets);
router.get('/byCentre', budgetCtrl.getBudgetsByCentre);
router.get('/:id', budgetCtrl.getBudgetById)

module.exports = router;
