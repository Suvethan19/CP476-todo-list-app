const data = App.load();

//get username for display
document.getElementById("username").textContent = data.user.username;

//set page title to list name
const params = new URLSearchParams(location.search);
const listId = Number(params.get("list_id"));
const list = data.lists.find(l => l.list_id === listId);
document.getElementById("listTitle").textContent = list ? list.list_name : "";

//create lists sidebar 
const nav = document.getElementById("listsNav");
nav.innerHTML = "";
data.lists.forEach(list => {

  const row = document.createElement("div");
  
  //list name + link
  const link = document.createElement("a");
  link.href = `list.html?list_id=${list.list_id}`;
  link.textContent = list.list_name;

  row.appendChild(link);
  nav.appendChild(row);
});

//new task link
const addTaskLink = document.getElementById("addTaskLink");
if (list) {
  addTaskLink.href = `add-task.html?list_id=${list.list_id}`;
}

//display tasks grouped by date
const container = document.getElementById("listContainer");
container.innerHTML = "";

const listTasks = data.tasks.filter(t => t.list_id === listId);

//collect unique date labels
const dateLabels = [];
listTasks.forEach(t => {
  const label = t.due_date;
  if (!dateLabels.includes(label)) dateLabels.push(label);
});

//display date then tasks below
dateLabels.forEach(label => {
  const header = document.createElement("h3");
  header.textContent = label;
  container.appendChild(header);

  //list tasks
  listTasks
    .filter(t => t.due_date === label)
    .forEach(task => {
      
      //add checkbox beside to mark completed
      const row = document.createElement("div");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.is_completed === 1;
      const text = document.createElement("span");
      text.textContent = task.task_description;
      if (task.is_completed === 1) text.classList.add("strike");
      checkbox.onchange = () => {
        task.is_completed = checkbox.checked ? 1 : 0;
        App.save(data);
        location.reload();
      };

      //edit button
      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.textContent = "Edit";
      editBtn.onclick = () => {
        const newText = prompt("Edit task:", task.task_description);
        if (!newText) return;
        task.task_description = newText.trim();
        App.save(data);
        location.reload();
      };

      //delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => {
        data.tasks = data.tasks.filter(t => t.task_id !== task.task_id);
        App.save(data);
        location.reload();
      };

      row.appendChild(checkbox);
      row.appendChild(text);
      row.appendChild(document.createTextNode(" "));
      row.appendChild(editBtn);
      row.appendChild(document.createTextNode(" "));
      row.appendChild(deleteBtn);
      container.appendChild(row);
      
    });

});