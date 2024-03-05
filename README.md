## Склонировать проект
https://github.com/ardubone/testerproject.git


#### Установка зависимостей
- npm ci
## Запуск фронт проекта
- npm run dev

## Тестирование приложения
- Самостоятельное тестирование окружения 
- Поиск дефектов
### Работа с charles перехват запроса
- В кнопке Test есть запрос.
- В модальном окне кнопка "Получить картинку" делает запрос на сторонний сервис
- Кнопка "Проверить" проверяет, что в инпуте валидные данные
- Проверить, что работает валидация проверки инпута на картинку и нет

## Переключиться на ветку backend
### Работа с командами в терминале
- Переместите/скопируйте через терминал файлы Dockerfile и docker-compose из папки docker в основную папку проекта
### Запустить проект в контейнере
- docker-compose up -d

### Работа с API/Postman
- npm ci (если не запущен контейнер)
- npm run server (если не запущен контейнер)
- дефолтный порт api 3000
- swagger находится по адресу /api-doc/
- Загрузить все ендпоинты в постман
#### Работа с переменными
- Коллекцию нужно запустить, как  Run в следующем порядке:
  - Получить список карточек
  - Создать карточку с данными - Название из второй карточки, ссылка из последней, оунер новый любой
  - Лайкнуть эту карточку
  - Удалить эту карточку
  - Запросить карточку по id - убедиться, что она удалена.
  
#### Остановить контейнер
- docker-compose down