document.addEventListener('DOMContentLoaded', () => {
const types = [
  { key: 'note', label: 'Заметка', icon: '📝' },
  { key: 'todo', label: 'Список дел', icon: '✅' },
  { key: 'link', label: 'Ссылка', icon: '🔗' },
  { key: 'reminder', label: 'Напоминание', icon: '⏰' },
  { key: 'idea', label: 'Идея', icon: '💡' },
  { key: 'other', label: 'Другое', icon: '📦' }
];
const sizes = [
  { key: 'xs', label: 'Очень маленькое', width: 180, height: 100 },
  { key: 'sm', label: 'Маленькое', width: 260, height: 140 },
  { key: 'md', label: 'Среднее', width: 340, height: 200 },
  { key: 'lg', label: 'Большое', width: 440, height: 260 },
  { key: 'xl', label: 'Очень большое', width: 540, height: 340 },
  { key: 'custom', label: 'Пользовательское', width: 400, height: 220 }
];
const positions = [
  { key: 'top-left', label: 'Верхний левый', style: { top: 30, left: 30 } },
  { key: 'top-right', label: 'Верхний правый', style: { top: 30, right: 30 } },
  { key: 'bottom-left', label: 'Нижний левый', style: { bottom: 30, left: 30 } },
  { key: 'bottom-right', label: 'Нижний правый', style: { bottom: 30, right: 30 } },
  { key: 'center', label: 'Центр', style: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } },
  { key: 'custom', label: 'Свои координаты', style: { top: 100, left: 100 } }
];
const colors = [
  { key: 'default', label: 'По умолчанию', color: '#23272f' },
  { key: 'blue', label: 'Синий', color: '#b3d1ff' },
  { key: 'yellow', label: 'Жёлтый', color: '#f6e58d' },
  { key: 'orange', label: 'Оранжевый', color: '#ffbe76' },
  { key: 'red', label: 'Красный', color: '#e17055' },
  { key: 'violet', label: 'Фиолетовый', color: '#a29bfe' }
];
const icons = [
  { key: '📝', label: 'Блокнот' },
  { key: '✅', label: 'Галочка' },
  { key: '🔗', label: 'Ссылка' },
  { key: '⏰', label: 'Часы' },
  { key: '💡', label: 'Лампочка' },
  { key: '📦', label: 'Бокс' }
];

function fillSelect(id, arr, valueKey = 'key', labelKey = 'label') {
  const sel = document.getElementById(id);
  sel.innerHTML = arr.map(opt => `<option value="${opt[valueKey]}">${opt[labelKey]}</option>`).join('');
}
fillSelect('type-select', types);
fillSelect('size-select', sizes);
fillSelect('position-select', positions);
fillSelect('color-select', colors);
fillSelect('icon-select', icons, 'key', 'label');

const modalParams = Array.from({ length: 6 }, (_, i) => ({
  type: types[i % types.length].key,
  size: sizes[i % sizes.length].key,
  position: positions[i % positions.length].key,
  color: colors[i % colors.length].key,
  icon: icons[i % icons.length].key,
  customX: 100,
  customY: 100,
  content: ''
}));

let selectedModalIdx = 0;
function updateControls(idx) {
  selectedModalIdx = idx;
  const params = modalParams[idx];
  document.getElementById('type-select').value = params.type;
  document.getElementById('size-select').value = params.size;
  document.getElementById('position-select').value = params.position;
  document.getElementById('color-select').value = params.color;
  document.getElementById('icon-select').value = params.icon;
}

['type', 'size', 'position', 'color', 'icon'].forEach(field => {
  document.getElementById(field+'-select').addEventListener('change', e => {
    modalParams[selectedModalIdx][field] = e.target.value;
  });
});

for (let i = 0; i < 6; i++) {
  document.getElementById('open-modal-' + i).onclick = openModalHandler(i).bind(null);
  document.getElementById('open-modal-' + i).onfocus = () => updateControls(i);
}
updateControls(0);

function openModalHandler(idx) {
  return function() {
    showModal.call(null, idx, { ...modalParams[idx] });
  };
}

function showModal(idx, params) {
  const typeObj = types.find(t => t.key === params.type);
  const sizeObj = sizes.find(s => s.key === params.size);
  const posObj = positions.find(p => p.key === params.position);
  const colorObj = colors.find(c => c.key === params.color);
  const iconObj = icons.find(ic => ic.key === params.icon);

  const modal = document.createElement('div');
  modal.className = 'modal ' + params.type;
  modal.style.width = sizeObj.width + 'px';
  modal.style.height = sizeObj.height + 'px';
  modal.style.background = colorObj.color;

  ['top', 'left', 'right', 'bottom', 'transform'].forEach(prop => modal.style[prop] = '');
  let coords = { ...posObj.style };
  if (params.position === 'custom') {
    coords = { top: params.customY + 'px', left: params.customX + 'px' };
  } else {
    Object.keys(coords).forEach(k => {
      if (typeof coords[k] === 'number') coords[k] = coords[k] + 'px';
    });
  }
  Object.entries(coords).forEach(([k, v]) => {
    modal.style[k] = v;
  });

  const header = document.createElement('div');
  header.className = 'modal-header';
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.innerText = '×';
  closeBtn.onclick = () => modal.remove();
  header.appendChild(closeBtn);
  modal.appendChild(header);

  const title = document.createElement('div');
  title.style.fontSize = '1.3em';
  title.style.fontWeight = 'bold';
  title.style.marginBottom = '8px';
  title.innerHTML = `${iconObj.key} ${typeObj.label}`;
  modal.appendChild(title);

  const contentDiv = document.createElement('div');
  contentDiv.style.marginBottom = '12px';
  contentDiv.innerText = params.content || 'Введите свой текст...';
  modal.appendChild(contentDiv);

  const editBtn = document.createElement('button');
  editBtn.className = 'primary-btn';
  editBtn.style.marginTop = '8px';
  editBtn.textContent = 'Изменить параметры';
  editBtn.onclick = () => editModalParams(idx, modal, contentDiv);
  modal.appendChild(editBtn);

  document.getElementById('modals-container').appendChild(modal);
}
function editModalParams(idx, modal, contentDiv) {
  const params = modalParams[idx];
  const form = document.createElement('form');
  form.innerHTML = `
    <label>Тип:
      <select id="edit-type">${types.map(t => `<option value="${t.key}" ${params.type === t.key ? 'selected' : ''}>${t.label}</option>`).join('')}</select>
    </label><br>
    <label>Размер:
      <select id="edit-size">${sizes.map(s => `<option value="${s.key}" ${params.size === s.key ? 'selected' : ''}>${s.label}</option>`).join('')}</select>
    </label><br>
    <label>Позиция:
      <select id="edit-position">${positions.map(p => `<option value="${p.key}" ${params.position === p.key ? 'selected' : ''}>${p.label}</option>`).join('')}</select>
    </label><br>
    <label>Цвет:
      <select id="edit-color">${colors.map(c => `<option value="${c.key}" ${params.color === c.key ? 'selected' : ''}>${c.label}</option>`).join('')}</select>
    </label><br>
    <label>Иконка:
      <select id="edit-icon">${icons.map(ic => `<option value="${ic.key}" ${params.icon === ic.key ? 'selected' : ''}>${ic.label}</option>`).join('')}</select>
    </label><br>
    <label>Текст:<br><textarea id="edit-content" rows="2" style="width:90%">${params.content || ''}</textarea></label><br>
    <label style="display:${params.position === 'custom' ? 'block' : 'none'};">X: <input type="number" id="edit-x" value="${params.customX}" style="width:60px;"></label>
    <label style="display:${params.position === 'custom' ? 'block' : 'none'};">Y: <input type="number" id="edit-y" value="${params.customY}" style="width:60px;"></label>
    <button type="submit" class="primary-btn" style="margin-top:10px;">Сохранить</button>
  `;
  form.querySelector('#edit-position').addEventListener('change', e => {
    const show = e.target.value === 'custom';
    form.querySelectorAll('label').forEach(lab => {
      if (lab.innerText.startsWith('X:') || lab.innerText.startsWith('Y:')) {
        lab.style.display = show ? 'block' : 'none';
      }
    });
  });
  form.onsubmit = e => {
    e.preventDefault();
    params.type = form.querySelector('#edit-type').value;
    params.size = form.querySelector('#edit-size').value;
    params.position = form.querySelector('#edit-position').value;
    params.color = form.querySelector('#edit-color').value;
    params.icon = form.querySelector('#edit-icon').value;
    params.content = form.querySelector('#edit-content').value;
    if (params.position === 'custom') {
      params.customX = parseInt(form.querySelector('#edit-x').value, 10) || 100;
      params.customY = parseInt(form.querySelector('#edit-y').value, 10) || 100;
    }
    const sizeObj = sizes.find(s => s.key === params.size);
    const colorObj = colors.find(c => c.key === params.color);
    modal.style.width = sizeObj.width + 'px';
    modal.style.height = sizeObj.height + 'px';
    modal.style.background = colorObj.color;
    ['top', 'left', 'right', 'bottom', 'transform'].forEach(prop => modal.style[prop] = '');
    let coords = { ...positions.find(p => p.key === params.position).style };
    if (params.position === 'custom') {
      coords = { top: params.customY + 'px', left: params.customX + 'px' };
    } else {
      Object.keys(coords).forEach(k => {
        if (typeof coords[k] === 'number') coords[k] = coords[k] + 'px';
      });
    }
    Object.entries(coords).forEach(([k, v]) => {
      modal.style[k] = v;
    });
    modal.querySelector('div:nth-child(2)').innerHTML = `${params.icon} ${types.find(t => t.key === params.type).label}`;
    contentDiv.innerText = params.content || 'Введите свой текст...';
    form.remove();
  };
  modal.appendChild(form);
}

});