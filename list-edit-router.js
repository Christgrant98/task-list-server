const express = require("express");
const tasks_list = require("./tasks");
const router = express.Router();

const handleEditErrors = (req, res, next) => {
  if (req.method === 'POST') {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío.' });
    }

    const { id, status, description } = req.body;
    if (!id || !status || !description) {
      return res.status(400).json({ error: 'La solicitud POST debe incluir un id, status y description.' });
    }
  }

  if (req.method === 'PUT') {
    const indexToUpdate = tasks_list.findIndex((task) => task.id == id);
    if (indexToUpdate == -1) res.status(404).send("Not found"); 
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío.' });
    }

    const { status, description } = req.body;
    if (!status || !description) {
      return res.status(400).json({ error: 'La solicitud PUT debe incluir, status y description.' });
    }
  }

  next();
};

// Aplicar el middleware en todas las rutas de este router
router.use(handleEditErrors);

router.post('/', (req, res) => {
  console.log(req.body)
  tasks_list.push({...req.body, status: 'Completado'});
  res.json({tasks: tasks_list});
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const indexToUpdate = tasks_list.findIndex((task) => task.id == id);
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