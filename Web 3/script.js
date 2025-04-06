document.addEventListener('DOMContentLoaded', () => {
    let fieldCounter = 3;
    const formContainer = document.querySelector('.form-container');

    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('focus', () => {
            input.style.backgroundColor = '#f9f9f9';
            input.style.border = '2px solid #4CAF50';
        });
        input.addEventListener('blur', () => {
            input.style.backgroundColor = 'white';
            input.style.border = '1px solid #ddd';
        });
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const inputs = document.querySelectorAll('.form-input');
                const currentIndex = Array.from(inputs).indexOf(e.target);
                if (currentIndex < inputs.length - 1) {
                    inputs[currentIndex + 1].focus();
                }
            }
        });
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
        document.querySelectorAll('.form-input').forEach(input => {
            input.value = '';
            input.placeholder = 'Пожалуйста, заполните это поле';
            input.classList.add('cleared');
            setTimeout(() => input.classList.remove('cleared'), 1000);
        });
    });

    document.getElementById('showBtn').addEventListener('click', () => {
        const dataList = document.getElementById('data-list');
        dataList.innerHTML = '';
        const fontSize = document.getElementById('fontSize').value;
        const textColor = document.getElementById('textColor').value;

        let hasData = false;
        document.querySelectorAll('.form-input').forEach((input, index) => {
            if (input.value.trim()) {
                hasData = true;
                const li = document.createElement('li');
                li.textContent = `Поле ${index + 1}: ${input.value}`;
                li.style.fontSize = fontSize;
                li.style.color = textColor;
                dataList.appendChild(li);
            }
        });

        if (hasData) {
            document.getElementById('modal').style.display = 'block';
        } else {
            alert('Нет данных для отображения!');
        }
    });

    document.getElementById('addBtn').addEventListener('click', () => {
        fieldCounter++;
        const newGroup = document.createElement('div');
        newGroup.className = 'input-group';
        newGroup.innerHTML = `
            <label>Поле ${fieldCounter}:</label>
            <input type="text" class="form-input" placeholder="Введите данные">
        `;

        const newInput = newGroup.querySelector('.form-input');
        newInput.addEventListener('focus', () => {
            newInput.style.backgroundColor = '#f9f9f9';
            newInput.style.border = '2px solid #4CAF50';
        });
        newInput.addEventListener('blur', () => {
            newInput.style.backgroundColor = 'white';
            newInput.style.border = '1px solid #ddd';
        });
        newInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const inputs = document.querySelectorAll('.form-input');
                const currentIndex = Array.from(inputs).indexOf(e.target);
                if (currentIndex < inputs.length - 1) {
                    inputs[currentIndex + 1].focus();
                }
            }
        });

        const settingsGroup = document.querySelector('.settings-group');
        formContainer.insertBefore(newGroup, settingsGroup);
    });

    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('modal').style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('modal')) {
            document.getElementById('modal').style.display = 'none';
        }
    });
});