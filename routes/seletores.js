const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// Retorna Elements
router.get('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      'SELECT * FROM seletores;',
      (error, result, fields) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        const response = {
          quantidade: result.length,
          seletores: result.map(seletor => {
            return {
              id_elemento: seletor.id,
              apelido: seletor.apelido_seletor,
              seletor: seletor.seletor,
              host: seletor.host,
              request: {
                tipo: 'GET',
                descricao: 'Retorna todos os seletores',
                url: `http://localhost:3000/seletores/${seletor.id}`
              }
            }
          })
        }
        return (res.status(200).send({ response }))
      }
    )
  })
})
// Insere seletores
router.post('/', (req, res, next) => {
  const seletor = {
    apelido: '',
    seletor: '',
    host: ''
  }
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      'INSERT INTO seletores(,) VALUES(?,?)',
      [produto.nome, produto.preco],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null
          })
        }
        res.status(201).send({
          mensagem: `Cadastro de produto feito com o ID ${result.insertId}`,
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
      (error, result, field) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        return (res.status(200).send({ response: result }))
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
      (error, result, field) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
          'SELECT * FROM produtos WHERE id_produto = ?',
          [id],
          (error, result, field) => {
            if (error) { return res.status(500).send({ error: error }) }
            return (res.status(200).send({ novos_valores: result }))
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
      (error, result, field) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        return (res.status(202).send({
          result: result
        }))
      }
    )
  })

})

module.exports = router;