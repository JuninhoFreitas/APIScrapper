const express = require('express');
const router = express.Router();
// Retorna pedidos
router.get('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Retorna os pedidos'
  })
})
// Insere pedidos
router.post('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'Insere um pedido'
  })
})
// Retorna dados de um pedido
router.get('/:id_pedido', (req, res, next) => {
  const id = req.params.id_pedido
  if (id === 'especial') {
    res.status(200).send({
      mensagem: 'Usando o GET de um pedido ESPECIAL',
      id: id
    })
  } else {
    res.status(200).send({
      mensagem: 'Usando o GET de um pedido exclusivo',
      id: id
    })
  }

})
// Deleta um pedido

router.delete('/', (req, res, next) => {
  req.status(201).send({
    mensagem: 'Pedido deletado'
  })
})
module.exports = router;