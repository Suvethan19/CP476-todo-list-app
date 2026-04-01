const API_BASE = "/api";

const DEFAULT_USER = {
  user_id: 1,
  username: "Username"
};

window.App = {

  renderUsername() {
    const usernameEl = document.getElementById("username");
    if (usernameEl) {
      usernameEl.textContent = DEFAULT_USER.username;
    }
  },

  getListIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get("list_id"));
  },

  //-----list functions-----
  async getLists() {
    const response = await fetch(`${API_BASE}/lists`);
    return response.json();
  },

  async createList(listName) {
    const response = await fetch(`${API_BASE}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: DEFAULT_USER.user_id,
        list_name: listName
      })
    });

    return response.json();
  },

  async deleteList(listId) {
    const response = await fetch(`${API_BASE}/lists/${listId}`, {
      method: "DELETE"
    });

    return response.json();
  },

  //-----task functions-----
  async getTasks(listId) {
    let url = `${API_BASE}/tasks`;

    if (listId) {
      url += `?list_id=${listId}`;
    }

    const response = await fetch(url);
    return response.json();
  },

  async createTask(task) {
    const response = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });

    return response.json();
  },

  async updateTask(taskId, updatedTask) {
    const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    });

    return response.json();
  },

  async deleteTask(taskId) {
    const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
      method: "DELETE"
    });

    return response.json();
  },

  //-----rendering functions-----
  //build sidebar
  renderSidebar(lists, showDelete, reloadPage) {
    const nav = document.getElementById("listsNav");
    if (!nav) return;

    nav.innerHTML = "";

    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];

      const row = document.createElement("div");
      if (showDelete) {
        row.className = "nav-item-row";
      }

      const link = document.createElement("a");
      link.href = `list.html?list_id=${list.list_id}`;
      link.textContent = list.list_name;
      row.appendChild(link);

      if (showDelete) {
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "text-btn";
        deleteBtn.textContent = "Delete";

        deleteBtn.onclick = async function () {
          const confirmed = confirm(`Delete list "${list.list_name}" and all its tasks?`);
          if (!confirmed) return;

          await App.deleteList(list.list_id);
          reloadPage();
        };

        row.appendChild(deleteBtn);
      }

      nav.appendChild(row);
    }
  },

  //build updated task object
  buildTaskPayload(task, newDescription, newDueDate, newPriority, newCompleted) {
    return {
      task_description: newDescription !== undefined ? newDescription : task.task_description,
      due_date: newDueDate !== undefined ? newDueDate : this.normalizeDate(task.due_date),
      is_priority: newPriority !== undefined ? newPriority : Number(task.is_priority),
      is_completed: newCompleted !== undefined ? newCompleted : Number(task.is_completed)
    };
  },

  formatDate(dateString) {
    if (!dateString) {
      return "No due date";
    }

    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  },

  //convert date to YYYY-MM-DD
  normalizeDate(dateValue) {
    if (!dateValue) {
      return null;
    }

    const date = new Date(dateValue);
    return date.toISOString().split("T")[0];
  }
};
