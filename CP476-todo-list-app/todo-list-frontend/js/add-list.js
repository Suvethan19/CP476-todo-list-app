const data = App.load();

//get username for display
document.getElementById("username").textContent = data.user.username; 

//submit button clicked
document.getElementById("listForm").onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById("listName").value.trim();
  if (!name) return;

  //build list object
  data.lists.push({
    list_id: App.nextListId(data),
    user_id: data.user.user_id,
    list_name: name
  });
  
  //go back to hoem page
  App.save(data);
  window.location.href = "index.html";
};
