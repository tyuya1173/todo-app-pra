addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("タスクを入力してください");
        return;
    }

    //li要素を作成
    const li = document.createElement("li");

    //チェックボックスを作成
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    //ラベルを作成
    const label = document.createElement("label");
    label.textContent = taskText;

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

    //入力欄をリセット
    taskInput.value = "";
}