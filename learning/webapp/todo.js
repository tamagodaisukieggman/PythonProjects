// ページが読み込まれたとき、localStorageからタスクを取得し、それをDOMに追加
window.onload = function() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));

    if (tasks) {
        tasks.forEach(function(task) {
            addTodoToDOM(task);
        });
    }
}

// タスクをDOMに追加する関数
function addTodoToDOM(task) {
    var todoList = document.getElementById('todoList');

    var newTodo = document.createElement('li');
    newTodo.textContent = task;
    newTodo.className = 'todo-item';

    // タスクをクリックすると、DOMからタスクを削除し、さらにlocalStrageからも削除する
    newTodo.addEventListener('click', function() {
        todoList.removeChild(newTodo);
        removeFromLocalStorage(task);
    });

    todoList.appendChild(newTodo);
}

// タスクを追加する関数
function addTodo() {
    var todoInput = document.getElementById('todoInput');

    // 入力フィールドから取得したタスクをDOMとlocalStorageに追加
    var task = todoInput.value;
    if (task) {
        addTodoToDOM(task);
        addToLocalStorage(task);

        todoInput.value = '';
    }
}

// タスクをローカルストレージに追加する関数
function addToLocalStorage(task) {
    // 先に既存のタスクを取得、タスクがまだない場合は空の配列を使用・
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // 新たなタスクを配列に追加
    tasks.push(task);

    // タスクの配列をJSON形式に変換し、それを'tasks'キーでlocalStorageに保存
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// タスクをローカルストレージから削除する関数
function removeFromLocalStorage(task) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // 削除するタスクのインデクスを取得
    var taskIndex = tasks.indexOf(task);
    // タスクが存在すれば配列から削除
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        // タスクが削除された配列をJSON形式に変換し、それを'tasks'キーでlocalStorageに保存
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}