const express = require("express");
const tasks_list = require("./tasks");
const { verifyBody, verifyBodyKeys } = require("./middlewares");
const router = express.Router();

router.post('/', verifyBody, verifyBodyKeys(['description', 'id']), (req, res) => {
  console.log(req.body)
  tasks_list.push({...req.body, status: 'Completado'});
  res.status(201).json({tasks: tasks_list});
});

router.put('/:id', verifyBody, (req, res) => {
  const { id } = req.params;
  if (!req.body || Object.keys(req.body).length == 0) return res.status(400).json({error: true, message: 'No hay información que actualizar'}) 
  const indexToUpdate = tasks_list.findIndex((task) => task.id == id);
  if (indexToUpdate == -1) res.status(404).json({error: 'No se encontró la tarea'}); 
  tasks_list[indexToUpdate] = {...tasks_list[indexToUpdate], ...req.body}
  res.status(200).json({tasks: tasks_list})
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const indexToDelete = tasks_list.findIndex((task) => task.id == id);
  console.log(indexToDelete);
  if (indexToDelete == -1) res.status(404).json({error: 'No se encontró la tarea'});
  tasks_list.splice(indexToDelete, 1);
  res.status(200).json({tasks: tasks_list});
});

module.exports = router;