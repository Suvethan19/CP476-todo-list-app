async function loadHomePage() {
  App.renderUsername();

  const lists = await App.getLists();
  const tasks = await App.getTasks();

  App.renderSidebar(lists, true, loadHomePage);
  renderDueToday(lists, tasks);
}

//render tasks due today
function renderDueToday(lists, tasks) {
  const container = document.getElementById("todayContainer");
  container.innerHTML = "";

  const todayDate = new Date().toLocaleDateString("en-CA");
  let hasTasks = false;

  for (let i = 0; i < lists.length; i++) {
    const list = lists[i];
    const dueTodayTasks = [];

    for (let j = 0; j < tasks.length; j++) {
      const task = tasks[j];
      if (
        task.list_id === list.list_id &&
        App.normalizeDate(task.due_date) === todayDate &&
        Number(task.is_completed) === 0
      ) {
        dueTodayTasks.push(task);
      }
    }

    if (dueTodayTasks.length > 0) {
      hasTasks = true;

      const heading = document.createElement("h3");
      heading.textContent = list.list_name;
      container.appendChild(heading);

      for (let k = 0; k < dueTodayTasks.length; k++) {
        const task = dueTodayTasks[k];

        const row = document.createElement("div");
        row.className = "task-row";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = Number(task.is_completed) === 1;

        const text = document.createElement("span");
        text.textContent = task.task_description;

        //update if task completed
        checkbox.onchange = async function () {
          await App.updateTask(
            task.task_id,
            App.buildTaskPayload(task, undefined, undefined, undefined, checkbox.checked ? 1 : 0)
          );
          loadHomePage();
        };

        row.appendChild(checkbox);
        row.appendChild(text);
        container.appendChild(row);
      }
    }
  }

  //no tasks due
  if (!hasTasks) {
    container.innerHTML = "<p>No tasks due today.</p>";
  }
}

loadHomePage();
