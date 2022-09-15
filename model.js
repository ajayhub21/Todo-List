class TodoModel {
  constructor() {
    var todos = [];
    //ForOnloadFocus
    if (window.localStorage.getItem("todos") == undefined) {
      window.localStorage.setItem("todos", JSON.stringify(todos));
    }
    this.todos = JSON.parse(window.localStorage.getItem("todos"));
  }

  setToDo(todos) {
    this.todos = todos;
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }

  getToDo() {
    return JSON.parse(window.localStorage.getItem("todos"));
  }

  deleteTodo(id) {
    this.todos = this.getToDo();
    this.todos.forEach((element, index) => {
      if (element.id == id) {
        this.todos.splice(index, 1);
      }
    });
    this.setToDo(this.todos);
  }

  editStatus(id, checkboxActive) {
    this.todos = this.getToDo();
    this.todos.forEach(function (value) {
      if (value.id == id && !checkboxActive) {
        value.status = "completed";
      } else if (value.id == id && checkboxActive) {
        value.status = "notcompleted";
      }
    });
    this.setToDo(this.todos);
  }
  editTodo(id, editedValue, editedSelect, editedDate) {
    this.todos.forEach((element) => {
      if (element.id == id) {
        element.todo = editedValue;
        element.priority = editedSelect.value;
        element.date = editedDate;
      }
    });
    this.setToDo(this.todos);
  }
}
