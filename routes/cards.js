import express from 'express'
import supabase from '../supabase.js'

const router = express.Router()

// Получить все карточки
router.get('/', async (req, res) => {
  console.log('ssssss')

  const { data, error } = await supabase.from('cards').select('*')

  if (error) {
    return res.status(500).send(error.message)
  }
  res.json(data)
})

// Добавить новую карточку
router.post('/', async (req, res) => {
  const { title, content } = req.body

  const { data, error } = await supabase
    .from('cards')
    .insert([{ title, content }])

  if (error) {
    return res.status(500).send(error.message)
  }
  res.json(data)
})

// Удалить карточку
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const { error } = await supabase.from('cards').delete().eq('id', id)

  if (error) {
    return res.status(500).send(error.message)
  }
  res.send('Card deleted successfully')
})

export default router
