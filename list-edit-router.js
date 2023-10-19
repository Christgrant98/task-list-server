const express = require("express");
const tasks_list = require("./tasks");
const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body)
  tasks_list.push({...req.body, status: 'Completado'});
  res.json({tasks: tasks_list});
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const indexToUpdate = tasks_list.findIndex((task) => task.id == id);
  if (indexToUpdate == -1) res.status(404).json({error: 'No se encontró la tarea'}); 
  tasks_list[indexToUpdate] = {...tasks_list[indexToUpdate], ...req.body}
  res.json({tasks: tasks_list})
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const indexToDelete = tasks_list.findIndex((task) => task.id == id);
  console.log(indexToDelete);
  if (indexToDelete == -1) res.status(404).json({error: 'No se encontró la tarea'});
  tasks_list.splice(indexToDelete, 1);
  res.json({tasks: tasks_list});
});

module.exports = router;