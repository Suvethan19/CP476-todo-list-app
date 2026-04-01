//load the add-list page
async function loadAddListPage() {
  App.renderUsername();

  const lists = await App.getLists();
  App.renderSidebar(lists);

  const form = document.getElementById("listForm");
  form.onsubmit = async function (e) {
    e.preventDefault();

    const name = document.getElementById("listName").value.trim();
    if (!name) return;
    
    //send request to create a new list
    await App.createList(name);
    window.location.href = "index.html";
  };
}

loadAddListPage();
