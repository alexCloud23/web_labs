// --- ДАННЫЕ ---
const colorOptions = [
  {name: 'Красный', value: '#e57373'},
  {name: 'Синий', value: '#64b5f6'},
  {name: 'Салатовый', value: '#b9f6ca'},
  {name: 'Светло-зелёный', value: '#a5d6a7'},
  {name: 'Зелёный', value: '#43a047'},
  {name: 'Тёмно-зелёный', value: '#388e3c'},
  {name: 'Пастельно-зелёный', value: '#c8e6c9'},
  {name: 'Мятный', value: '#81c784'},
  {name: 'Лаймовый', value: '#e8f5e9'}
];
const texts = new Set([
  'Счастья, радости и вдохновения каждый день!',
  'Пусть мечты сбываются, а улыбка не сходит с лица!',
  'Здоровья, удачи и тепла в кругу близких!',
  'Пусть каждый день будет наполнен чудесами!',
  'С праздником! Пусть всё задуманное исполнится!',
  'Любви, гармонии и ярких моментов в жизни!',
  'Пусть удача всегда будет рядом с тобой!',
  'Солнечного настроения и приятных сюрпризов!'
]);

const cardsList = [];

class Card {
  constructor(text, color, fontSize = '1.1em', width = 240) {
    this.text = text;
    this.color = color;
    this.fontSize = fontSize;
    this.width = width;
  }
  static fromText(text) {
    return new Card(text, '#a5d6a7');
  }
  static fromColor(color) {
    return new Card('Поздравление по умолчанию', color);
  }
  render(index) {
    const div = document.createElement('div');
    div.className = 'block';
    div.style.background = '#fff';
    div.style.borderColor = this.color;
    div.style.width = this.width + 'px';
    div.style.height = '120px';
    div.style.gridArea = 'unset';
    const header = document.createElement('h2');
    header.textContent = `Открытка ${index + 1}`;
    div.appendChild(header);
    const span = document.createElement('span');
    span.textContent = this.text;
    span.style.fontSize = this.fontSize;
    div.appendChild(span);
    return div;
  }
}

function createControls() {
  const controls = document.getElementById('controls');
  controls.innerHTML = '';
  // Текст
  const textSelect = document.createElement('select');
  texts.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    textSelect.appendChild(opt);
  });
  // Цвет
  const colorSelect = document.createElement('select');
  colorOptions.forEach(optData => {
    const opt = document.createElement('option');
    opt.value = optData.value;
    opt.innerHTML = `<span style='display:inline-block;width:18px;height:18px;border-radius:50%;background:${optData.value};margin-right:8px;vertical-align:middle;border:1.5px solid #174c32;'></span> ${optData.name}`;
    colorSelect.appendChild(opt);
  });
  colorSelect.style.display = 'inline-block';
  colorSelect.style.verticalAlign = 'middle';
  // Размер текста
  const fontSizeSelect = document.createElement('select');
  [
    {label: 'Обычный', value: '1.1em'},
    {label: 'Крупный', value: '1.3em'},
    {label: 'Мелкий', value: '0.9em'}
  ].forEach(optData => {
    const opt = document.createElement('option');
    opt.value = optData.value;
    opt.textContent = optData.label;
    fontSizeSelect.appendChild(opt);
  });
  // Ширина
  const widthSelect = document.createElement('select');
  [220, 240, 260, 300].forEach(w => {
    const opt = document.createElement('option');
    opt.value = w;
    opt.textContent = `Ширина ${w}px`;
    widthSelect.appendChild(opt);
  });
  // Позиция
  const positionSelect = document.createElement('select');
  positionSelect.id = 'position-select';
  // Кнопка
  const addButton = document.createElement('button');
  addButton.textContent = 'Добавить открытку';
  addButton.style.verticalAlign = 'middle';
  controls.append('Текст:', textSelect, 'Цвет:', colorSelect, 'Размер текста:', fontSizeSelect, 'Ширина:', widthSelect, 'Позиция:', positionSelect, addButton);

  // Обновление позиций
  function updatePositions() {
    positionSelect.innerHTML = '';
    for (let i = 0; i <= cardsList.length; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `Позиция ${i + 1}`;
      positionSelect.appendChild(opt);
    }
  }

  // Добавление открытки
  addButton.onclick = () => {
    const card = new Card(
      textSelect.value,
      colorSelect.value,
      fontSizeSelect.value,
      parseInt(widthSelect.value)
    );
    const pos = parseInt(positionSelect.value);
    cardsList.splice(pos, 0, card);
    renderCards();
    updatePositions();
  };

  // Для отображения цветного кружка и названия в select
  colorSelect.addEventListener('change', function() {
    for (let i = 0; i < colorSelect.options.length; i++) {
      colorSelect.options[i].style.background = '';
      colorSelect.options[i].style.color = '';
    }
    const idx = colorSelect.selectedIndex;
    colorSelect.options[idx].style.background = colorOptions[idx].value;
    colorSelect.options[idx].style.color = '#fff';
  });

  updatePositions();
}

function renderCards() {
  const container = document.getElementById('notes-container');
  container.innerHTML = '';
  container.style.display = 'grid';
  container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(220px, 1fr))';
  container.style.gridGap = '32px';
  cardsList.forEach((card, i) => {
    const el = card.render(i);
    el.style.position = 'static';
    container.appendChild(el);
  });
}

window.onload = () => {
  createControls();
  // Первые две открытки: красная и синяя
  cardsList.push(new Card(
    'Любви, гармонии и ярких моментов в жизни!',
    '#e57373', '1.1em', 240
  ));
  cardsList.push(new Card(
    'Пусть мечты сбываются, а улыбка не сходит с лица!',
    '#64b5f6', '1.1em', 240
  ));
  renderCards();
  document.getElementById('position-select').selectedIndex = cardsList.length;
};