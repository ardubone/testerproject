import { Router } from "express";
import db from "../db/index.mjs";
import e from "express";


const router = Router();

//routes

//гетаем все карточки

router.get('/', async (req, res, next) => {
/**
 * #swagger /cards:
 *   get:
 *     description: Получить все карточки
 *     responses:
 *       '200':
 *         description: Массив карточек
 *         schema:
 *           $ref: '#/definitions/Cards'
 */

    try {
        await db.read();

    if (db.data) {
        res.status(200).json(db.data)
    }
    else {
        res.status(200).json({ message: 'No data' })
    }
    } catch (error) {
        console.log("Ошибка при пролучении всех карточек:" + error)
        next(error)
    }
})

//гетаем одну карточку
router.get('/:id', async (req, res, next) => {
/**
 * #swagger /cards/{id}:
 *   get:
 *     description: Получить одну карточку по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Существующий ID карточки
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Боди карточки
 *         schema:
 *           $ref: '#/definitions/Card'
 */

    const cardId = req.params.id;
    try {
        await db.read();

        if (!db.data) {
            res.status(200).json({ message: 'Нет данных' })
        }

        const card = db.data.find(card => card.id === cardId);
        if (card) {
            res.status(200).json(card);
        } else {
            res.status(200).json({ message: 'Карточка не найдена' });
        }
    } catch (error) {
        console.log("Ошибка при получении карточки:" + error);
        next(error);
    }
});

//пост новой карточки
router.post('/', async (req, res, next) => {
/**
 * #swagger /cards:
 *   post:
 *     description: Создать новую карточку
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Новая карточка
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewCard'
 *       - name: link
 *         in: body
 *         description: Новая карточка
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewCard'
 *       - name: owner
 *         in: body
 *         description: Новая карточка
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewCard'
 *     responses:
 *       '201':
 *         description: Возвращает новый массив карточек
 *         schema:
 *           $ref: '#/definitions/Cards'
 */

    const { name, link, owner } = req.body;

    if (!name || !link || !owner) {
        return res.status(400).json({ message: 'Нужно заполнить данные ' })
    }

    try {
        await db.read();

        const newCard = {
            id: String(db.data.length + 1),
            name,
            link,
            owner,
            likes: []
        }

        db.data.push(newCard);

        await db.write();

        res.status(201).json(db.data);

    }
    catch (error) {
        console.log("Ошибка при создании карточки:" + error);
        next(error);
    }
})

//лайкнуть карточку
router.put('/:id', async (req, res, next) => {
/**
 * #swagger /cards/{id}:
 *   put:
 *     description: Лайкнуть карточку
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Существующая карточка
 *         required: true
 *         type: string
 *       - name: userId
 *         in: body
 *         description: Айди юзера
 *         required: true
 *         schema:
 *           $ref: '#/definitions/LikeDislike'
 *     responses:
 *       '201':
 *         description: Возвращает карточку
 *         schema:
 *           $ref: '#/definitions/Card'
 */


    const cardId = req.params.id;
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).json({ message: 'Нужно заполнить данные юзера' })
    }

    if (!cardId) {
        return res.status(400).json({ message: 'Нужно заполнить id карточки' })
    }

    try {
        await db.read();

        const card = db.data.find(card => card.id === cardId);
        if (!card) {
            return res.status(404).json({ message: 'Карточка не найдена' });
        }

        if (card.likes.includes(userId)) {
            const updatedLikes = card.likes.filter((like) => like !== String(userId));
            card.likes = updatedLikes;
        }
        else {
            card.likes.push(userId);
        }

        await db.write();

        res.status(200).json(card);
    } catch (error) {
        console.log("Ошибка при лайке карточки:" + error);
        next(error);
    }
});

//удаляем карточку
router.delete('/:id', async (req, res, next) => {
/**
 * #swagger /cards/{id}:
 *   delete:
 *     description: Удаляет карточку, если она принадлежит пользователю
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Существующий ID
 *         required: true
 *         type: string
 *       - name: userId
 *         in: body
 *         description: Айди пользователя
 *         required: true
 *         schema:
 *           $ref: '#/definitions/DeleteCard'
 *     responses:
 *       '201':
 *         description: Возвращает ответ
 */


  const cardId = req.params.id;
  const userId = req.body.userId; //переделать на хедер

  if (!cardId) {
    return res.status(400).json({ message: 'Нужно заполнить id карточки' });
  }

  if (!userId) {
    return res.status(400).json({ message: 'Нужно заполнить данные юзера' });
  }

  try {
    await db.read();

    const cardIndex = db.data.findIndex((card) => card.id === cardId);
    if (cardIndex === -1) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }

    const card = db.data[cardIndex];

    if (card.owner === userId) {
      db.data.splice(cardIndex, 1); // Remove the card from the data array
      await db.write();
      res.status(200).json({ message: 'Карточка успешно удалена' });

    } else {
      return res.status(403).json({ message: 'Недостаточно прав для удаления карточки' });
    }
  } catch (error) {
    console.log("Ошибка при удалении карточки:" + error);
    next(error);
  }
});


export default router