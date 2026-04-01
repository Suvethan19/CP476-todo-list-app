async function loadListPage() {
  App.renderUsername();

  const listId = App.getListIdFromUrl();
  if (!listId) {
    alert("Invalid list");
    window.location.href = "index.html";
    return;
  }

  const lists = await App.getLists();
  let list = null;
  for (let i = 0; i < lists.length; i++) {
    if (lists[i].list_id === listId) {
      list = lists[i];
    }
  }
  if (!list) {
    alert("List not found");
    window.location.href = "index.html";
    return;
  }

  //render list page
  document.getElementById("listTitle").textContent = list.list_name;
  App.renderSidebar(lists);
  document.getElementById("addTaskLink").href = `add-task.html?list_id=${listId}`;
  const tasks = await App.getTasks(listId);
  renderTasks(tasks);
}

//render tasks grouped by date
function renderTasks(tasks) {
  const container = document.getElementById("listContainer");
  container.innerHTML = "";

  if (tasks.length === 0) {
    container.innerHTML = "<p>No tasks in this list yet.</p>";
    return;
  }

  //get unique dates
  const dateLabels = [];
  for (let i = 0; i < tasks.length; i++) {
    const label = tasks[i].due_date || "No due date";
    if (!dateLabels.includes(label)) {
      dateLabels.push(label);
    }
  }

  //render tasks for each date
  for (let i = 0; i < dateLabels.length; i++) {
    const label = dateLabels[i];
    const header = document.createElement("h3");
    header.textContent = label === "No due date" ? label : App.formatDate(label);
    container.appendChild(header);

    for (let j = 0; j < tasks.length; j++) {
      const task = tasks[j];
      const taskLabel = task.due_date || "No due date";
      if (taskLabel === label) {

        const row = document.createElement("div");
        row.className = "task-row";

        //completed checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = Number(task.is_completed) === 1;

        //task description
        const text = document.createElement("span");
        text.textContent = task.task_description;
        if (Number(task.is_priority) === 1) {
          text.textContent += " [!]";
        }
        if (Number(task.is_completed) === 1) {
          text.classList.add("strike");
        }

        //mark completed
        checkbox.onchange = async function () {
          await App.updateTask(
            task.task_id,
            App.buildTaskPayload(task, undefined, undefined, undefined, checkbox.checked ? 1 : 0)
          );
          loadListPage();
        };

        //edit task button
        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.className = "text-btn";
        editBtn.textContent = "Edit";

        editBtn.onclick = async function () {
          const newText = prompt("Edit task:", task.task_description);
          if (newText === null) return;

          const trimmedText = newText.trim();
          if (!trimmedText) return;

          const newDueDate = prompt(
            "Edit due date (YYYY-MM-DD). Leave blank for no due date:",
            App.normalizeDate(task.due_date) || ""
          );
          if (newDueDate === null) return;

          const newPriorityInput = prompt(
            "Priority? Enter yes or no:",
            Number(task.is_priority) === 1 ? "yes" : "no"
          );
          if (newPriorityInput === null) return;

          const newPriority = newPriorityInput.trim().toLowerCase() === "yes" ? 1 : 0;

          await App.updateTask(
            task.task_id,
            App.buildTaskPayload(
              task,
              trimmedText,
              newDueDate.trim() || null,
              newPriority
            )
          );

          loadListPage();
        };

        // delete task button
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "text-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = async function () {
          await App.deleteTask(task.task_id);
          loadListPage();
        };

        row.appendChild(checkbox);
        row.appendChild(text);
        row.appendChild(document.createTextNode(" "));
        row.appendChild(editBtn);
        row.appendChild(document.createTextNode(" "));
        row.appendChild(deleteBtn);

        container.appendChild(row);
      }
    }
  }
}

loadListPage();
