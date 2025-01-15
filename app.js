import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cardsRoutes from './routes/cards.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const customFormat = ':date[iso] :method :url :status'
const logger = morgan(customFormat)

app.use(logger)

// Middleware для парсинга JSON
app.use(bodyParser.json())

// Роуты для работы с карточками
app.use('/cards', cardsRoutes)

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
