const express = require('express');
const router = express.Router();
// Retorna produtos
router.get('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Usando o GET dentro da rota de produtos'
  })
})
// Insere produtos
router.post('/', (req, res, next) => {
  const produto = {
    nome: req.body.nome,
    preco: Number(req.body.preco),
  }
  res.status(201).send({
    mensagem: 'Cadastro de produto efetivado. ',
    produtoCriado: `Nome: ${produto.nome} Preço: ${produto.preco >= 0 ? (produto.preco) : ('Produto Invalido')}`
  })
})
// Retorna dados de um produto
router.get('/:id_produto', (req, res, next) => {
  const id = req.params.id_produto
  if (id === 'especial') {
    res.status(200).send({
      mensagem: 'Usando o GET de um produto ESPECIAL',
      id: id
    })
  } else {
    res.status(200).send({
      mensagem: 'Usando o GET de um produto exclusivo',
      id: id
    })
  }

})
// Alterando um produto
router.patch('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'Usando o PATCH dentro da rota de produtos'
  })
})
// Deletando um produto
router.delete('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'Usando o DELETE dentro da rota de produtos'
  })
})

module.exports = router;