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
  const pedido = {
    nome: req.body.nome,
    quantidade: req.body.quantidade
  }
  res.status(201).send({
    mensagem: 'Pedido inserido.',
    pedidoCriado: { Nome: `${pedido.nome}`, Quantidade: (pedido.quantidade >= 0) || (pedido.quantidade <= 0) ? (pedido.quantidade) : ('Quantidade inválida') }
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
router.delete('/:id_pedido', (req, res, next) => {
  const id_pedido = req.params.id_pedido;

  res.status(201).send({
    mensagem: `Pedido Nº${id_pedido} deletado com sucesso.`
  })
})
module.exports = router;