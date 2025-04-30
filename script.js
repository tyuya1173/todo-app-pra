//タスクを追加する関数
addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("タスクを入力してください");
        return;
    }

    //タスクをリストに追加する関数を呼び出し
    addTaskToList(taskText, false);

    //現在のローカスストレージデータを更新
    updateStorage();

    //入力欄をリセット
    taskInput.value = "";
}

//タスクをリストに追加する関数
function addTaskToList(taskText, completed) {
    const taskList = document.getElementById("taskList");

    //li要素を作成
    const li = document.createElement("li");

    //チェックボックスを作成
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    //ラベルを作成
    const label = document.createElement("label");
    label.textContent = taskText;

    if(checkbox.checked) {
        li.style.display = "none"; // チェックされたら非表示
    }
    
    //チェックボックスにイベントを追加
    checkbox.addEventListener("change", () => {
        if(checkbox.checked) {
            li.style.display = "none"; // チェックされたら非表示
        }
    });

    //liにチェックボックスとラベルを追加
    li.appendChild(checkbox);
    li.appendChild(label);

    //リストに追加
    taskList.appendChild(li);
}

//ローカルストレージを更新
function updateStorage() {
    const listItems = document.querySelectorAll("#taskList li");
    const tasks = [];

    listItems.forEach(li => {
        const checkbox = li.querySelector("input[type='checkbox']");
        const label = li.querySelector("label");

        tasks.push({
            text: label.textContent,
            completed: checkbox.checked
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//ページ位読み込み時に保存されたタスクを復元
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        addTaskToList(task.text, task.completed);
    });
}