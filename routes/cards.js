import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cards')
    res.json(result.rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

router.post('/', async (req, res) => {
  const { title, text } = req.body

  try {
    const result = await pool.query(
      'INSERT INTO cards (title, text) VALUES ($1, $2) RETURNING *',
      [title, text]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

router.delete('/', async (req, res) => {
  const cards = req.body
  if (!Array.isArray(cards) || cards.length === 0) {
    return res.status(400).send('Массив id обязателен')
  }

  try {
    const placeholders = cards.map((_, index) => `$${index + 1}`).join(', ')
    const query = `DELETE FROM cards WHERE id IN (${placeholders})`

    const result = await pool.query(query, cards)
    res.json({ message: `${result.rowCount} карточек удалено` })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Ошибка сервера')
  }
})

export default router

// Вариант с использованием базы данных в Supabase

// import express from 'express'
// import supabase from '../supabase.js'

// const router = express.Router()

// // Получить все карточки
// router.get('/', async (req, res) => {

//   const { data, error } = await supabase.from('cards').select('*')

//   if (error) {
//     return res.status(500).send(error.message)
//   }
//   res.json(data)
// })

// // Добавить новую карточку
// router.post('/', async (req, res) => {
//   const { title, content } = req.body

//   const { data, error } = await supabase
//     .from('cards')
//     .insert([{ title, content }])

//   if (error) {
//     return res.status(500).send(error.message)
//   }
//   res.json(data)
// })

// // Удалить карточку
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params

//   const { error } = await supabase.from('cards').delete().eq('id', id)

//   if (error) {
//     return res.status(500).send(error.message)
//   }
//   res.send('Card deleted successfully')
// })

// export default router
