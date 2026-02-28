const data = App.load();

//get username for display
document.getElementById("username").textContent = data.user.username;

//create lists sidebar 
const nav = document.getElementById("listsNav");
nav.innerHTML = "";
data.lists.forEach(list => {

  const row = document.createElement("div");
  
  //list name + link
  const link = document.createElement("a");
  link.href = `list.html?list_id=${list.list_id}`;
  link.textContent = list.list_name;

  //delete list button
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {

    //remove tasks in list
    data.tasks = data.tasks.filter(t => t.list_id !== list.list_id);
    data.lists = data.lists.filter(l => l.list_id !== list.list_id);

    App.save(data);
    location.reload();
  };

  row.appendChild(link);
  row.appendChild(deleteBtn);
  nav.appendChild(row);
});

//tasks due today grouped by list
const container = document.getElementById("todayContainer");
container.innerHTML = "";
const todayDate = new Date().toLocaleDateString("en-CA");

data.lists.forEach(list => {

  //filter by date
  const dueTodayTasks = data.tasks.filter(t =>
    t.list_id === list.list_id &&
    t.due_date === todayDate &&
    t.is_completed === 0
  );

  if (dueTodayTasks.length === 0) return;

  //display
  const heading = document.createElement("h3");
  heading.textContent = list.list_name;
  container.appendChild(heading);

  dueTodayTasks.forEach(task => {

    //add checkbox beside to mark completed
    const row = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.is_completed === 1;
    const text = document.createElement("span");
    text.textContent = task.task_description;
    checkbox.onchange = () => {
      task.is_completed = checkbox.checked ? 1 : 0;
      App.save(data);
      location.reload();
    };

    row.appendChild(checkbox);
    row.appendChild(text);
    container.appendChild(row);
  });

});