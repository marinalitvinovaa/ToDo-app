const form = document.querySelector('#form');
const input = form.querySelector('#taskInput');
const toDoWrapper = document.querySelector('#tasksList');
const emptyTodo = document.querySelector('.empty-list');

let arr = localStorage.getItem('Test') ? JSON.parse(localStorage.getItem('Test')) : [];
    
if (localStorage.getItem('Test') !== undefined) {
      renderFromLocal();
}

//1. Добавление задач в список дел
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!input.value.trim()) {
    return;
  } else {
    
    let obj = addToLocal(input.value.trim())
    let li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between task-item';
    if (obj.done) {
      li.classList.add('task-title--done')
    }
    li.id = obj.id;
    li.innerHTML = `
        <span class="task-title">${obj.toDo}</span>
        <div class="task-item__buttons">
          <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
          </button>
          <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
          </button>
        </div>
    `;
    toDoWrapper.append(li)
    if (!localStorage.getItem('Test') || localStorage.getItem('Test') === undefined) {
      let arr = [];
      arr.push(obj);
      localStorage.setItem(JSON.stringify(obj))
    }
    form.reset();
    input.value = '';
    input.focus();
}
handleList();
})
handleList();
//2. Список дел пуст
function handleList() {
const emptyTodo = document.querySelector('.empty-list');
  if (arr.length) {
    emptyTodo.classList.add('none');
  } else {
    emptyTodo.classList.remove('none');
  }
}
//3. Удаление задачи
window.addEventListener('click', (e) => {
  if (e.target.getAttribute('data-action') === 'delete') {
    const li = e.target.closest('.task-item'); //получаем li по которой нажали
    const id = li.id; //получаем id этой li
    let loc = JSON.parse(localStorage.getItem('Test')); //получаем данные
    let arrLocal = loc.filter(el => el.id != id); // удаляем с выбранным Id
    arr = arr.filter(el => el.id != id); //и обновляем элемент в массиве
    localStorage.setItem('Test', JSON.stringify(arrLocal));
    li.remove();
    handleList();
  }
})
//4. Отметим выполненную задачу
toDoWrapper.addEventListener('click', (e) => {
  if (e.target.dataset.action === 'done') {
    let item = e.target.closest('.task-item'); 

    item.classList.toggle('task-title--done'); 
    let itemId = item.id; 

    arr.forEach(el => {
      if (el.id == itemId) {
        if (item.classList.contains('task-title--done')) {
          el.done = true;
        } else {
          el.done = false
        }
      }
    })
    localStorage.setItem('Test', JSON.stringify(arr));
    toDoWrapper.innerHTML = '';
    toDoWrapper.append(emptyTodo);
    renderFromLocal();
  }
})
//5. сохранение в localStorage
function renderFromLocal () {
  if (localStorage.getItem('Test')) {
    let arr = JSON.parse(localStorage.getItem('Test'));
    arr.forEach(obj => {
      let li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between task-item';
      if (obj.done) {
        li.classList.add('task-title--done')
      }
      li.id = obj.id;
      li.innerHTML = `
          <span class="task-title">${obj.toDo}</span>
          <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
              <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
              <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
          </div>
      `;
      toDoWrapper.append(li)
    })
  } 
 
}
//6. Добавление дела в локальное хранилище 
function addToLocal(value) {
  //6.1 Формируем объект:
  let taskItem = {}; //создаем пустой объект
  taskItem.id = Date.now(); //прописываем уникальный id
  let task = value; //получаем данные из поля ввода
  taskItem.toDo = task; //добавляем в объект название задачи
  taskItem.done = false; //ставим отмкетку, что задча не выполнилась
  arr.push(taskItem) //добавляем в локальный массим объект дела
  //обновляем локальное хранилище
  localStorage.setItem('Test', JSON.stringify(arr));
  return taskItem;
}



