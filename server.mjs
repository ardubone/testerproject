import express from "express";
import router from "./routes/cards.routes.mjs";
import fs from 'fs'
import swaggerUi from 'swagger-ui-express'
import open from 'open'

const app = express();
const PORT = 3000;

const swaggerFile = JSON.parse(fs.readFileSync('./swagger/output.json'))

//парсим джейсон
app.use(express.json());

//роутинг на карточки
app.use("/cards", router);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('/api-doc.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerFile);
  });

//запрет юзать иные ендпоинты
app.get('*', (req, res) => {
    res.send("Воспользуйся докой")
})



//показ ошибки
app.use((err, req, res, next) => {
    console.log(err)
    const status = err.status || 500
    const message = err.message || 'Ошибка сервера'
    res.status(status).json({ message })
   })

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
    open(`http://localhost:${PORT}/api-doc`);
})