class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.createATodoList(this.model.todos);
    this.view.bindAdd(this.handleGet, this.handleSet);
    this.view.bindDeleteAll(this.handleDeleteAll);
    this.view.bindDelete(this.handleDeleteAll);
    this.view.bindSave(this.handleEdit);
    this.view.bindStatus(this.handleStatus);
  }

  handleGet = () => {
    return this.model.getToDo();
  };

  handleSet = (toDoObj) => {
    this.model.setToDo(toDoObj);
  };

  handleDeleteAll = (id) => {
    this.model.deleteTodo(id);
  };

  handleStatus = (id, checkboxActive) => {
    this.model.editStatus(id, checkboxActive);
  };
  handleEdit = (id, editedValue, editedSelect, editedDate) => {
    this.model.editTodo(id, editedValue, editedSelect, editedDate);
  };
}
