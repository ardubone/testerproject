import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import swaggerAutogen from 'swagger-autogen'

const _dirname = dirname(fileURLToPath(import.meta.url))

const doc = {
    // общая информация
    info: {
      title: 'Cards API',
      description: 'API для тестового проекта'
    },
    // что-то типа моделей
    definitions: {
      // модель карточки
      Card: {
        "id": "6",
        "name": "Рим",
        "link": "https://avatars.dzeninfra.ru/get-zen_doc/4467222/pub_6224c6f8f48a103f23d1e320_6224c7717124ba47b92eeb47/scale_2400",
        "owner": "id7894"
        ,
        "likes": [
            "id123",
            "id897",
            "id7894"
    
        ]
      },
      // модель массива карточек
      Cards: [
        {
          // ссылка на модель карточки
          $ref: '#/definitions/Card'
        }
      ],
      // модель объекта с новыми данными
      NewCard: {
        "name": "Рим",
        "link": "https://avatars.dzeninfra.ru/get-zen_doc/4467222/pub_6224c6f8f48a103f23d1e320_6224c7717124ba47b92eeb47/scale_2400",
        "owner": "id7894"
      },
      // модель объекта с лайк/дизлайк
      LikeDislike: {
          "userId": "id123"
      },
      // модель для удаления карточки
      DeleteCard: {
        "userId": "id123"
      }
    },
    host: 'localhost:3000',
    schemes: ['http']
   }

// путь и название генерируемого файла
const outputFile = join(_dirname, 'output.json')
// массив путей к роутерам
const endpointsFiles = [join(_dirname, '../routes/cards.routes.js')]

swaggerAutogen(/*options*/)(outputFile, endpointsFiles, doc).then(({ success }) => {
 console.log(`Generated: ${success}`)
})