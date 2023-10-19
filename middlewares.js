const verifyBodyKeys = (keys) => {
  return (req, res, next) => {
    const receivedKeys = Object.keys(req.body);

    if (!(JSON.stringify(keys.sort()) == JSON.stringify(receivedKeys.sort()))) res.status(400).json({error: true, message: 'Hacen falta datos requeridos para ejecutar esta acción'});
    next();
  }

}
const verifyBody = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length == 0) return res.status(400).json({error: true, message: 'Cuerpo vacío'})
    next();
}

module.exports = { verifyBody, verifyBodyKeys };