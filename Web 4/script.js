let submissions = JSON.parse(localStorage.getItem('submissions')) || [];

document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!this.checkValidity()) {
        alert('Заполните все обязательные поля!');
        return;
    }

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        brand: document.getElementById('brand').value,
        week: document.getElementById('visitWeek').value,
        rating: document.getElementById('rating').value,
        color: document.getElementById('standColor').value,
        features: [...document.querySelectorAll('input[name="features"]:checked')].map(c => c.value)
    };

    submissions.push(formData);
    localStorage.setItem('submissions', JSON.stringify(submissions));
    
    showResults();
});

function showResults() {
    const win = window.open('', 'Результаты', 'width=800,height=600,resizable=yes');
    
    win.document.write(`
        <html>
        <head>
            <title>Результаты опроса</title>
            <link rel="stylesheet" href="css/style.css">
        </head>
        <body>
            <h2>Результаты опроса</h2>
            <table border="1">
                <tr>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Бренд</th>
                    <th>Неделя</th>
                    <th>Оценка</th>
                    <th>Цвет</th>
                    <th>Особенности</th>
                </tr>
                ${submissions.map(sub => `
                <tr>
                    <td>${sub.name}</td>
                    <td>${sub.email}</td>
                    <td>${sub.brand}</td>
                    <td>${sub.week}</td>
                    <td>${sub.rating}</td>
                    <td style="background:${sub.color}"></td>
                    <td>${sub.features.join(', ')}</td>
                </tr>
                `).join('')}
            </table>
            <button onclick="window.close()">Закрыть</button>
            <button onclick="window.history.back()">Назад</button>
        </body>
        </html>
    `);
}