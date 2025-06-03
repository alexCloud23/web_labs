document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/artists/processed')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('artist-list');
      list.innerHTML = '';
      if (data.length === 0) {
        const li = document.createElement('li');
        li.className = 'placeholder';
        li.textContent = 'Список пуст';
        list.appendChild(li);
      } else {
        data.forEach(artist => {
          const li = document.createElement('li');
          li.textContent = artist;
          list.appendChild(li);
        });
      }
    });
  document.getElementById('to-index').onclick = () => {
    window.location.href = '/';
  };
}); 