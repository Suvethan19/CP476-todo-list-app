//load add-task page
async function loadAddTaskPage() {
  App.renderUsername();

  const listId = App.getListIdFromUrl();
  document.getElementById("cancelLink").href = `list.html?list_id=${listId}`; //cancel button goes back to its list page

  const lists = await App.getLists();
  App.renderSidebar(lists);

  const form = document.getElementById("taskForm");
  form.onsubmit = async function (e) {
    e.preventDefault();

    //get input values
    const taskDescription = document.getElementById("taskDescription").value.trim();
    const dueDate = document.getElementById("dueDate").value;
    const isPriority = document.getElementById("isPriority").checked ? 1 : 0;
    if (!taskDescription) return;

    //create task
    await App.createTask({
      list_id: listId,
      task_description: taskDescription,
      due_date: dueDate || null,
      is_priority: isPriority,
      is_completed: 0
    });

    //go back to list page
    window.location.href = `list.html?list_id=${listId}`;  
  };
}

loadAddTaskPage();
