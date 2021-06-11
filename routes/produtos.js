const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// Retorna produtos
router.get('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      'SELECT * FROM produtos;',
      (error, resultado, fields) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        const response = {
          quantidade: resultado.length,
          produtos: resultado.map(prod => {
            return {
              id_produto: prod.id_produto,
              nome: prod.nome,
              preco: prod.preco,
              request: {
                tipo: 'GET',
                descricao: '',
                url: `http://localhost:3000/produtos/${prod.id_produto}`
              }
            }
          })
        }
        return (res.status(200).send({ response }))
      }
    )
  })
})
// Insere produtos
router.post('/', (req, res, next) => {
  const produto = {
    nome: req.body.nome,
    preco: Number(req.body.preco),
  }
  if (produto.preco >= 0 || produto.preco <= 0) {

  } else {
    return res.status(501).send({
      error: 'Produto com preço invalido'
    })
  }
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      'INSERT INTO produtos(nome,preco) VALUES(?,?)',
      [produto.nome, produto.preco],
      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null
          })
        }
        res.status(201).send({
          mensagem: `Cadastro de produto feito com o ID ${resultado.insertId}`,
          produtoCriado: `Nome: ${produto.nome} Preço: ${produto.preco >= 0 ? (produto.preco) : ('Produto Invalido')}`
        })

      }
    )
  })

})
// Retorna dados de um produto
router.get('/:id_produto', (req, res, next) => {
  const id = req.params.id_produto
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      'SELECT * FROM produtos WHERE id_produto = ?',
      [id],
      (error, resultado, field) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        return (res.status(200).send({ response: resultado }))
      }
    )
  })
})

// Alterando um produto
router.patch('/:id_produto', (req, res, next) => {
  const id = req.params.id_produto
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      `UPDATE produtos
        SET nome = ?,
          preco = ?
      WHERE id_produto = ?;
      `,
      [req.body.nome, req.body.preco, id],
      (error, resultado, field) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
          'SELECT * FROM produtos WHERE id_produto = ?',
          [id],
          (error, resultado, field) => {
            if (error) { return res.status(500).send({ error: error }) }
            return (res.status(200).send({ novos_valores: resultado }))
          }
        )

      }
    )
  })
})
// Deletando um produto
router.delete('/:id_produto', (req, res, next) => {
  id = req.params.id_produto;
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      'DELETE FROM produtos WHERE id_produto = ?',
      [id],
      (error, resultado, field) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        return (res.status(202).send({
          resultado: resultado
        }))
      }
    )
  })

})

module.exports = router;