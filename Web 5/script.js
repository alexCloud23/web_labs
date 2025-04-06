const SchoolClass = {
    data: JSON.parse(localStorage.getItem('classData')) || [],
    properties: ['address', 'rating', 'experience'],

    saveData() {
        localStorage.setItem('classData', JSON.stringify(this.data));
        this.updateUI();
    },

    addNewProperty() {
        const propInput = document.getElementById('newPropertyName');
        const propName = propInput.value.trim();
        const errorDiv = document.getElementById('propertyError');

        if (!propName) {
            errorDiv.textContent = "Введите название свойства!";
            return;
        }
        if (this.properties.includes(propName)) {
            errorDiv.textContent = "Свойство уже существует!";
            return;
        }

        this.properties.push(propName);
        
        this.data.forEach(record => record[propName] = '');
        
        this.saveData();
        propInput.value = "";
        errorDiv.textContent = "";
    },

    addRecord() {
        const newRecord = {
            id: Date.now(),
            classNumber: document.getElementById('classNumber').value,
            studentsCount: +document.getElementById('studentsCount').value,
            phone: document.getElementById('phone').value,
            teacherName: document.getElementById('teacherName').value,
            ...this.properties.reduce((acc, prop) => ({ ...acc, [prop]: '' }), {})
        };
        this.data.push(newRecord);
        this.saveData();
    },

    deleteRecord() {
        const id = +document.getElementById('idSelector').value;
        this.data = this.data.filter(record => record.id !== id);
        this.saveData();
    },

    updateUI() {
        const tbody = document.querySelector('#classTable tbody');
        const thead = document.querySelector('#classTable thead');
        const propSelector = document.getElementById('propertySelector');
        propSelector.innerHTML = this.properties
            .map(prop => `<option value="${prop}">${prop}</option>`)
            .join('');
        
        thead.innerHTML = `
            <tr>
                <th>ID</th>
                <th>№ класса</th>
                <th>Учащиеся</th>
                <th>Телефон</th>
                <th>Классный руководитель</th>
                ${this.properties.map(prop => `<th>${prop}</th>`).join('')}
            </tr>
        `;

        tbody.innerHTML = this.data.map(record => `
            <tr>
                <td>${record.id}</td>
                <td>${record.classNumber}</td>
                <td>${record.studentsCount}</td>
                <td>${record.phone}</td>
                <td>${record.teacherName}</td>
                ${this.properties.map(prop => `
                    <td>
                        <input 
                            type="text" 
                            value="${record[prop]}" 
                            onchange="SchoolClass.updateProperty(${record.id}, '${prop}', this.value)"
                        >
                    </td>
                `).join('')}
            </tr>
        `).join('');
    },

    clearForm() {
        document.getElementById('classForm').reset();
    },

    showExtremeTeachers() {
        const max = Math.max(...this.data.map(r => r.studentsCount));
        const min = Math.min(...this.data.map(r => r.studentsCount));
        
        const teachers = this.data.filter(r => 
            r.studentsCount === max || r.studentsCount === min
        ).map(r => r.teacherName);

        alert(`Руководители: ${teachers.join(', ')}`);
    },

    addProperty() {
        const prop = document.getElementById('propertySelector').value;
        if (!prop || this.properties.includes(prop)) return;

        this.properties.push(prop);
        this.data.forEach(record => record[prop] = '');
        this.saveData();
    },

    updateProperty(id, prop, value) {
        const record = this.data.find(r => r.id === id);
        if (record) {
            record[prop] = value;
            this.saveData();
        }
    },

    removeProperty() {
        const prop = document.getElementById('propertySelector').value;
        const errorDiv = document.getElementById('propertyError');
        
        if (!prop) {
            errorDiv.textContent = "Выберите свойство!";
            return;
        }
        
        this.properties = this.properties.filter(p => p !== prop);
        
        this.data.forEach(record => delete record[prop]);
        
        this.saveData();
        this.updateUI();
        errorDiv.textContent = "";
    },
};

document.addEventListener('DOMContentLoaded', () => SchoolClass.updateUI());