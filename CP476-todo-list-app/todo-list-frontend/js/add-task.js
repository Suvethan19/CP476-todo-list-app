const data = App.load();

//get username for display
document.getElementById("username").textContent = data.user.username;

//get current list id
const params = new URLSearchParams(location.search);
const listId = Number(params.get("list_id"));
document.getElementById("cancelLink").href = "list.html?list_id=" + listId;

//submit button clicked
document.getElementById("taskForm").onsubmit = function(e) {
  e.preventDefault();
  const desc = document.getElementById("taskDesc").value.trim();
  if (!desc) return;

  //build task object
  data.tasks.push({
    task_id: App.nextTaskId(data),
    list_id: listId,
    task_description: desc,
    due_date: document.getElementById("taskDue").value || null,
    is_priority: document.getElementById("taskPriority").checked ? 1 : 0,
    is_completed: 0
  });

  //go back to the list page
  App.save(data);
  window.location.href = "list.html?list_id=" + listId;
};
 