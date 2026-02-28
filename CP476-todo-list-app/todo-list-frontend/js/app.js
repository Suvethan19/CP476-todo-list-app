const KEY = "to_do_list";

//initialise blank app
function initApp() {
  return {
    user: { user_id: 1, username: "Username" },
    lists: [],
    tasks: []
  };
}

// auto increment id 
function nextId(items, key) {
  if (items.length === 0) return 1;
  return Math.max(...items.map(i => i[key])) + 1;
}

window.App = {

  load() {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);

    //nothing saved, initialise
    const data = initApp();
    localStorage.setItem(KEY, JSON.stringify(data));
    return data;
  },

  save(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  },

  nextListId(data) {
    return nextId(data.lists, "list_id");
  },

  nextTaskId(data) {
    return nextId(data.tasks, "task_id");
  }
};
