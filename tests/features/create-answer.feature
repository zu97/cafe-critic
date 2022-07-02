#language:ru
#noinspection NonAsciiCharacters

Функционал: Создание нового комментария
  Для того, чтобы пользоваться приложением
  Как обычный пользователь
  Я должен иметь возможность создавать новые комментарии

  @create-answer
  Сценарий: Создание комментария
    Допустим  я нахожусь на странице "Логин"
    Если я ввожу в поля формы:
      | Email    | anna@gmail.com |
      | Password | 123            |
    И нажимаю на кнопку формы "Login"
    И я жду "1" секунд

    Допустим  я нахожусь на странице "Главная"
    И я кликаю на текст "SafeHouse Spy"
    И я жду "1" секунд

    Если я ввожу в поля формы:
      | Review text | New Super Review :)   |
    И я кликаю на элемент со стилями "[name='foodQuality'] div.br-unit:nth-child(3)"
    И я кликаю на элемент со стилями "[name='serviceQuality'] div.br-unit:nth-child(3)"
    И я кликаю на элемент со стилями "[name='interiorQuality'] div.br-unit:nth-child(3)"
    И нажимаю на кнопку формы "Submit review"

    То я должен увидеть текст "Review successfully added"
    И я жду "1" секунд
    И я вижу элемент с xpath "//*[contains(text(), 'Ratings')]/ancestor::mat-card/descendant::span[contains(text(), 'Overall')]/ancestor::div/strong", текст которого содержит "3"
    И я вижу элемент с xpath "//*[contains(text(), 'Ratings')]/ancestor::mat-card/descendant::span[contains(text(), 'Quality of food')]/ancestor::div/strong", текст которого содержит "3"
    И я вижу элемент с xpath "//*[contains(text(), 'Ratings')]/ancestor::mat-card/descendant::span[contains(text(), 'Service quality')]/ancestor::div/strong", текст которого содержит "3"
    И я вижу элемент с xpath "//*[contains(text(), 'Ratings')]/ancestor::mat-card/descendant::span[contains(text(), 'Interior')]/ancestor::div/strong", текст которого содержит "3"
