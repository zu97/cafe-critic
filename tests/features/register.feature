#language:ru
#noinspection NonAsciiCharacters

Функционал: Регистрация пользователя
  Для того, чтобы пользоваться приложением
  Как обычный пользователь
  Я должен иметь возможность зарегистрироваться

  @register
  Сценарий: Регистрация
    Допустим я нахожусь на странице "Регистрация"
    Если я ввожу в поля формы:
      | Email           | mary@gmail.com |
      | Password        | 123            |
      | Repeat password | 123            |
      | Display Name    | Mary           |
    И нажимаю на кнопку формы "Register"
    То я должен увидеть текст "User is registered"
