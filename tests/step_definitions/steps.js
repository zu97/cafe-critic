const {I} = inject();
// Add in your custom step files

Given('я нахожусь на странице {string}', (page) => {
  switch (page) {
    case 'Главная':
      return I.amOnPage('/');
    case 'Регистрация':
      return I.amOnPage('/register');
    case 'Логин':
      return I.amOnPage('/login');
    case 'Создание заведения':
      return I.amOnPage('/places/new');
    default:
      return I.amOnPage('/');
  }
});

Given('я перехожу на страницу {string}', (page) => {
  I.amOnPage('/' + page);
});

Given('я ввожу в поля формы:', (table) => {
  table.rows.forEach(row => {
    row.cells[0];
    row.cells[1];
    I.fillField(row.cells[0].value, row.cells[1].value);
  });
});

Given('загружаю файл {string} в поле формы', (file) => {
  I.attachFile('form input[type="file"]', 'data/' + file);
});

Given('нажимаю на кнопку формы {string}', (buttonText) => {
  I.click(buttonText, {css: 'form'});
});

Given('я должен увидеть текст {string}', (text) => {
  I.wait(2);
  I.see(text);
});

Given('я кликаю на текст {string}', (text) => {
  I.click(text);
});

Given('я кликаю на текст {string} со стилями {string}', (text, styles) => {
  I.click(text, {css: styles});
  I.wait(2);
});

Given('я кликаю на пост со стилями {string}', styles => {
  I.click({css: styles});
});

Given('я кликаю на иконку со стилями {string}', (styles) => {
  I.click({css: styles});
});

Given('я вижу текст {string} со стилями {string}', (text, styles) => {
  I.see(text, {css: styles});
});

Given('я ввожу в поле {string} текст {string}', (field, text) => {
  I.fillField(field, text);
});

Given('я открываю новую вкладку', () => {
  I.openNewTab();
  I.amOnPage('http://localhost:4210/');
});

Given('я не должен видеть текст {string}', (text) => {
  I.wait(2);
  I.dontSee(text);
});

Given('я жду {string} секунд', (seconds) => {
  I.wait(parseInt(seconds));
});

Given('я не должен видеть текст со стилями {string}', (styles) => {
  I.dontSee({css: styles});
});

Given('я кликаю на кнопку со стилями {string}', (styles) => {
  I.click({css: styles});
});

Given('я кликаю на элемент со стилями {string}', (styles) => {
  I.click({css: styles});
});

Given('я вижу элемент с xpath {string}, текст которого содержит {string}', (xpath, text) => {
  I.see(text, {xpath});
});