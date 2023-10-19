const express = require("express");

const tasks_list = require("./tasks");
const router = express.Router();

router.get('/', (req, res) => {
  res.json({tasks_list})
});

router.get('/completas', (req, res) => {
  res.json(tasks_list.filter(task => task.status == 'completada'))
});

router.get('/incompletas', (req, res) => {
  res.json(tasks_list.filter(task => task.status == 'incompleta'))
});

module.exports = router;