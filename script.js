//タスクを追加する関数
addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const deadlineInput = document.getElementById("deadlineInput");
    const taskList = document.getElementById("taskList");

    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("タスクを入力してください");
        return;
    }

    const deadline = deadlineInput.value;

    addTaskToList(taskText, false, deadline);

    updateStorage();
    taskInput.value = "";

    deadlineInput.value = "";
}

//タスクをリストに追加する関数
function addTaskToList(taskText, completed, deadline) {
    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    const label = document.createElement("label");
    label.textContent = taskText;

    const deadlineLabel = document.createElement("label");
    deadlineLabel.style.fontSize = "12px";
    deadlineLabel.style.display = "block";

    //期限の表示テキストを設定
    deadlineLabel.textContent = deadline
    ? `期限： ${new Date(deadline).toLocaleString("ja-JP")}`
    : "期限： 未設定";

    if (checkbox.checked) {
        li.style.display = "none";
    }

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            li.style.display = "none";
        }
        updateStorage(); // ←チェック変更時に保存も更新
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deadlineLabel);

    taskList.appendChild(li);
}

//ローカルストレージを更新
function updateStorage() {
    const listItems = document.querySelectorAll("#taskList li");
    const tasks = [];

    listItems.forEach(li => {
        const checkbox = li.querySelector("input[type='checkbox']");
        const labels = li.querySelectorAll("label"); //ラベルが複数ある

        const text = labels[0]?.textContent || "";
        const deadlineText = labels[1]?.textContent || "";

        const deadline = deadlineText.startWith("期限： ") ? deadlineText.replace("期限： ", "") : "";

        tasks.push({
            text: text,
            completed: checkbox.checked,
            deadline: deadline
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//ページ読み込み時に保存されたタスクを復元
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        addTaskToList(task.text, task.completed, task.deadline);
    });
}