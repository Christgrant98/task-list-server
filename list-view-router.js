const express = require("express");

const tasks_list = require("./tasks");
const router = express.Router();

router.get('/', (req, res) => {
  res.json({tasks_list})
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const foundTask = tasks_list.find(task => task.id == id)
  if (!foundTask) res.status(404).json({error: true, message: 'Tarea no encontrada'});
  res.json({task: foundTask})
});

router.get('/completas', (req, res) => {
  res.json(tasks_list.filter(task => task.status == 'completada'))
});

router.get('/incompletas', (req, res) => {
  res.json(tasks_list.filter(task => task.status == 'incompleta'))
});

module.exports = router;