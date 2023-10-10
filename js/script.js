const localStorageName = 'to-do-list';

function validandoIntemExistente(values, inputValue) {
    let existe = values.find(x => x.name === inputValue);
    return existe ? true : false;
}

function newTask() {
    let input = document.getElementById('input-new-task');
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]");
    input.style.border = ''

    // Validação
    if (!input.value) {
        input.style.border = '1px solid red'
        alert('Digite algo para inserir em sua lista');
    } else if (validandoIntemExistente(values, input.value)) {
        alert('Já existe este item');
    } else {
        // Adicionando um novo item ao array
        values.push({
            name: input.value
        });

        // Salvando o array de volta no Local Storage
        localStorage.setItem(localStorageName, JSON.stringify(values));
        showValues();
    }
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']} <button id='btn-ok' onclick="removeItem('${values[i]['name']}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
      </svg></button></li>`;
    }
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]");
    let index = values.findIndex(x => x.name === data);
    values.splice(index, 1);
    localStorage.setItem(localStorageName, JSON.stringify(values));
    showValues();
}

showValues();
