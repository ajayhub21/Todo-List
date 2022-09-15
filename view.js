class TodoView {
  constructor() {
    var container = document.querySelector(".container");
    var header = document.createElement("H1");
    var header_txt = document.createTextNode("Todo List");
    this.addButton = document.createElement("button");

    header.classList.add("title");
    var multipleSelect_wrapper = document.createElement("div");
    multipleSelect_wrapper.classList.add("MutipleDelete");
    var multipleSelect = document.createElement("i");
    multipleSelect.classList.add("fa", "fa-check-square-o");
    //  <i class="fa fa-check-square-o" style="font-size:48px;color:red"></i>
    multipleSelect.classList.add("mul_sel");
    multipleSelect.setAttribute("title", "MultipleSelect");
    multipleSelect.addEventListener("click", (e) => this.multipleSelect(e));
    this.deleteAll = document.createElement("i");
    this.deleteAll.classList.add("fas");
    this.deleteAll.classList.add("fa-trash-alt");
    this.deleteAll.classList.add("del_all");
    this.deleteAll.setAttribute("title", "DeleteAll");

    var main_div = document.createElement("div");
    main_div.classList.add("inputDiv");
    var input_box = document.createElement("input");
    input_box.type = "text";
    input_box.id = "todo-text";
    input_box.maxLength = "25";
    input_box.placeholder = "Enter your todo...";
    input_box.classList.add("input");
    var select_values = ["Low", "Medium", "High"];
    var items = document.createElement("select");
    items.id = "todo-select";
    for (const val of select_values) {
      var option = document.createElement("option");
      option.value = val;
      option.text = this.capitalize(val);

      items.appendChild(option);
    }
    items.value = "Medium";

    //date
    var date_wrapper = document.createElement("div");
    date_wrapper.id = "datetimepicker1";
    date_wrapper.classList.add("input-group", "date");
    var date_attribute = document.createAttribute("data-date-format");
    date_attribute.value = "dd-mm-yyyy";
    date_wrapper.setAttributeNode(date_attribute);
    var input_date = document.createElement("input");
    input_date.type = "text";
    input_date.id = "datepicker";
    input_date.classList.add("form-control");
    input_date.placeholder = "Date&&Time";
    var calendarSpan = document.createElement("span");
    calendarSpan.classList.add("input-group-addon");
    calendarSpan.id = "CalenderIcon";
    var calendar = document.createElement("i");
    calendar.classList.add("glyphicon", "glyphicon-calendar");
    date_wrapper.appendChild(input_date);
    date_wrapper.appendChild(calendarSpan);
    calendarSpan.appendChild(calendar);
    //--------------------------------------------------------------

    this.addButton.classList.add("add");
    var add_txt = document.createTextNode("+");
    var msg = document.createElement("p");
    var msg_txt = document.createTextNode("Please enter a todo/choose");
    msg.id = "errorMessage";
    msg.classList.add("hide", "high");
    var list_div = document.createElement("div");
    list_div.classList.add("listing_section");
    var containe = document.querySelector(".container");
    var remove_main = document.createElement("div");
    remove_main.id = "id01";
    remove_main.classList.add("DeleteBOx");
    var span_close = document.createElement("span");
    span_close.classList.add("wrong");
    var span_txt = document.createTextNode("×");
    span_close.addEventListener("click", (e) => hidden(e));

    var form_rem = document.createElement("form");
    var rem_container = document.createElement("div");
    rem_container.classList.add("containe");
    var instr = document.createElement("p");
    var instr_txt = document.createTextNode("Are you sure you want to delete?");
    var clear = document.createElement("div");
    clear.classList.add("clearfix");
    var cancel_btn = document.createElement("button");
    var cancel_txt = document.createTextNode("Cancel");
    cancel_btn.addEventListener("click", hidden);
    cancel_btn.classList.add("cancelbtn");
    var delete_btn = document.createElement("button");
    var delete_txt = document.createTextNode("Delete");

    //remove
    var remove_main = document.createElement("div");
    remove_main.id = "id01";
    remove_main.classList.add("DeleteBox", "hide");
    var span_close = document.createElement("span");
    span_close.classList.add("wrong");
    var span_txt = document.createTextNode("×");
    span_close.addEventListener("click", (e) => hidden(e));

    function hidden(e) {
      document.getElementById("id01").classList.add("hide");
      container.classList.remove("del_style");
      e.preventDefault();
    }
    var form_rem = document.createElement("form");
    var rem_container = document.createElement("div");
    rem_container.classList.add("containe");
    var instr = document.createElement("p");
    instr.classList.add("Msg");
    var instr_txt = document.createTextNode(
      "Are you sure you want to delete this item?"
    );
    var clear = document.createElement("div");
    clear.classList.add("clearfix");
    var cancel_btn = document.createElement("button");
    var cancel_txt = document.createTextNode("Cancel");
    cancel_btn.addEventListener("click", (e) => hidden(e));
    cancel_btn.classList.add("cancelbtn");
    var delete_btn = document.createElement("button");
    delete_btn.classList.add("del");
    var delete_txt = document.createTextNode("Delete");
    delete_btn.appendChild(delete_txt);
    cancel_btn.appendChild(cancel_txt);
    span_close.appendChild(span_txt);
    instr.appendChild(instr_txt);
    clear.appendChild(cancel_btn);
    clear.appendChild(delete_btn);
    rem_container.appendChild(instr);
    rem_container.appendChild(clear);
    form_rem.appendChild(rem_container);
    remove_main.appendChild(span_close);
    remove_main.appendChild(form_rem);
    document.body.appendChild(remove_main);

    header.appendChild(header_txt);
    main_div.appendChild(input_box);
    main_div.appendChild(items);
    main_div.appendChild(date_wrapper);
    main_div.appendChild(this.addButton);
    this.addButton.appendChild(add_txt);
    msg.appendChild(msg_txt);
    container.appendChild(header);
    multipleSelect_wrapper.appendChild(multipleSelect);
    multipleSelect_wrapper.appendChild(this.deleteAll);
    container.appendChild(multipleSelect_wrapper);

    container.appendChild(main_div);
    container.appendChild(msg);
    container.appendChild(list_div);

    document.querySelector(".del_all").style.display = "none";

    document.getElementById("todo-text").focus();
    this.todos = JSON.parse(window.localStorage.getItem("todos"));
  }

  bindSave(handle) {
    document
      .querySelector(".listing_section")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("edit")) {
          e.target.parentElement.previousSibling.classList.toggle("editable");
          var parentElement = e.target.parentElement.previousSibling;
          console.log("parentElement", parentElement);
          var editedInputValue = parentElement.querySelector(".editInput");
          var editedselectValue = parentElement.querySelector(".todo-selected");
          var editedDateValue = parentElement.querySelector(".form-control");
          console.log(editedDateValue);
          if (
            e.target.parentElement.previousSibling.classList.contains(
              "editable"
            )
          ) {
            parentElement.children[1].classList.add("hide");
            parentElement.children[2].classList.remove("hide");
            e.target.classList.remove("fa-pencil-alt");
            e.target.classList.add("fa-check");
            parentElement.children[0].classList.add("hide");
          } else {
            e.target.classList.add("fa-pencil-alt");
            e.target.classList.remove("fa-check");
            parentElement.children[1].classList.remove("hide");
            parentElement.children[2].classList.add("hide");
            parentElement.children[0].classList.remove("hide");
            var id =
              parentElement.querySelector(".view").children[1].textContent;
            handle(
              id,
              editedInputValue.value,
              editedselectValue,
              editedDateValue.value
            );
            parentElement.querySelector(".input_item").textContent =
              editedInputValue.value;
            parentElement
              .querySelector(".view")
              .children[3].setAttribute(
                "data",
                parentElement.querySelector(".todo-selected").value
              );
            console.log(editedDateValue.value);
            parentElement.querySelector(".input_date").textContent =
              editedDateValue.value;
            parentElement
              .querySelector(".view")
              .children[2].classList.remove(
                parentElement.querySelector(".view").children[2].classList[1]
              );
            parentElement
              .querySelector(".view")
              .children[3].classList.add(
                editedselectValue.value.toLocaleLowerCase()
              );
          }
        }
      });
  }

  bindDelete(handle) {
    document
      .querySelector(".listing_section")
      .addEventListener("click", (event) => {
        if (event.target.classList.contains("close")) {
          this.deleteTodo(event.target, handle);
        }
      });
  }

  deleteTodo(deleteElement, handle) {
    var el = document.querySelector(".container");
    el.classList.add("del_style");
    var del = document.querySelector(".del");
    document.getElementById("id01").classList.remove("hide");
    del.addEventListener("click", function (e) {
      deleteElement.closest(".contain").remove();
      handle(deleteElement.closest(".contain").id);

      document.getElementById("id01").classList.add("hide");
      el.classList.remove("del_style");
      e.preventDefault();
    });
  }

  bindAdd(getHandle, setHandle) {
    this.addButton.addEventListener("click", (e) => {
      this.addToDo(getHandle, setHandle);
      e.preventDefault();
    });
    window.addEventListener("keydown", (e) => {
      if (e.which == 13) {
        this.addToDo(getHandle, setHandle);
      }
    });
  }

  addToDo(getHandle, setHandle) {
    const todoText = document.getElementById("todo-text");
    var todoSelect = document.getElementById("todo-select");
    var todoDate = document.getElementById("datepicker");
    var toDo = getHandle();
    if (toDo == "[]") {
      this.todoId = 0;
    } else {
      this.todoId = toDo.length;
    }
    if (todoText.value && todoSelect.value) {
      let toDoObj = {
        todo: document.getElementById("todo-text").value,
        priority: document.getElementById("todo-select").value,
        status: "notCompleted",
        id: this.todoId,
        date: document.getElementById("datepicker").value,
      };
      this.createItem(
        todoText.value,
        todoSelect.value,
        status,
        this.todoId,
        todoDate.value
      );
      toDo.push(toDoObj);
      setHandle(toDo);
      this.todoId += 1;
      todoText.value = "";
      todoSelect.value = "Medium";
      todoDate.value = "";
      document.getElementById("errorMessage").classList.add("hide");
    } else {
      document.getElementById("errorMessage").classList.remove("hide");
    }
  }

  bindStatus(handle) {
    document
      .querySelector(".listing_section")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("slider")) {
          var parentEle = e.target.parentElement.parentElement;
          var view_ele = parentEle.nextElementSibling;
          var inputtxt = parentEle.parentElement;
          this.statusChange(view_ele, inputtxt, handle);
        }
      });
  }

  statusChange(e, input, handle) {
    var nextEle = e.children[1].textContent;
    // console.log(nextEle);
    var checkboxActive = input.classList.contains("checked");
    input.classList.toggle("checked");
    handle(nextEle, checkboxActive);
  }

  multipleSelect(e) {
    document.querySelector(".del_all").style.display = "inline-block";
    document.querySelector(".mul_sel").style.display = "none";

    var label_ele = document.querySelectorAll(".show");
    console.log(label_ele[0]);
    for (var i = 0; i < label_ele.length; i++) {
      if (label_ele[i].classList.contains("hide")) {
        label_ele[i].classList.remove("hide");
      }
    }
  }

  bindDeleteAll(deleteHandle) {
    this.deleteAll.addEventListener("click", (e) =>
      this.deleteAllClick(deleteHandle)
    );
  }
  deleteAllClick(deleteHandle) {
    var list = document.querySelector(".listing_section");
    var deleting = document.querySelectorAll(".contain");

    for (var i = 0; i < deleting.length; i++) {
      var del = deleting[i].classList.contains("deleted");

      if (del) {
        var id =
          deleting[i].childNodes[0].nextElementSibling.children[1].children[1]
            .textContent;
        list.removeChild(deleting[i]);
        deleteHandle(id);
      }
    }

    document.querySelector(".del_all").style.display = "none";
    document.querySelector(".mul_sel").style.display = "inline-block";

    var label_ele = document.querySelectorAll(".show");

    for (var i = 0; i < label_ele.length; i++) {
      label_ele[i].classList.add("hide");
    }
  }
  capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  createATodoList(todos) {
    for (var v = 0; v < todos.length; v++) {
      this.createItem(
        todos[v].todo,
        todos[v].priority,
        todos[v].status,
        todos[v].id,
        todos[v].date
      );
    }
  }

  createItem(text, selectValue, status, todoId, date) {
    var contains = document.createElement("div");
    contains.classList.add("contain");
    contains.id = todoId;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "selectTodo";
    checkbox.classList.add("show", "hide");
    var div_input = document.createElement("div");
    div_input.classList.add("input_txt");

    var div_on = document.createElement("div");
    div_on.classList.add("wrap_switch");
    var switchs = document.createElement("label");
    switchs.classList.add("switch");
    var check_on = document.createElement("input");
    check_on.type = "checkbox";
    if (status == "completed") {
      div_input.classList.add("checked");
      check_on.checked = true;
    }

    var span_inner = document.createElement("span");
    span_inner.classList.add("slider");

    var input = document.createElement("span");

    input.classList.add("input_item");
    var inputId = document.createElement("span");
    inputId.classList.add("input_id");

    const prioritySpan = document.createElement("span");
    var actualDiv = document.createElement("div");
    actualDiv.classList.add("view");
    const dateSpan = document.createElement("span");
    dateSpan.classList.add("input_date");

    const priorityFlag = document.createElement("i");
    priorityFlag.classList.add("material-icons");
    priorityFlag.id = "Flag";
    priorityFlag.setAttribute("data", selectValue);

    priorityFlag.classList.add(selectValue.toLocaleLowerCase());
    priorityFlag.textContent = "flag";
    var edited = document.createElement("div");
    edited.classList.add("edited", "hide");
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = text;
    editInput.maxLength = "25";
    editInput.classList.add("editInput");
    var values = ["Low", "Medium", "High"];
    var select = document.createElement("select");
    select.classList.add("todo-selected");
    for (const val of values) {
      var option = document.createElement("option");
      option.value = val;
      option.text = this.capitalize(val);

      select.appendChild(option);
    }

    select.value = selectValue;
    var Edit_date_wrapper = document.createElement("div");
    Edit_date_wrapper.id = "datepicker1";
    Edit_date_wrapper.classList.add("input-group_edit", "date");
    var Edit_input_date = document.createElement("input");
    Edit_input_date.type = "text";
    Edit_input_date.classList.add("datetimepicker2");
    Edit_input_date.value = date;
    Edit_input_date.classList.add("form-control");
    // var Edit_calendarSpan = document.createElement("span");
    // Edit_calendarSpan.classList.add("input-group-addon");
    // var Edit_calendar = document.createElement("i");
    // Edit_calendar.classList.add("glyphicon", "glyphicon-calendar");
    Edit_date_wrapper.appendChild(Edit_input_date);
    // Edit_date_wrapper.appendChild(Edit_calendarSpan);
    // Edit_calendarSpan.appendChild(Edit_calendar);
    const wrapper = document.createElement("div");
    const div = document.createElement("div");
    div.classList.add("remove");
    input.textContent = text;
    inputId.textContent = todoId;
    dateSpan.textContent = date;

    const textNode = document.createTextNode(text);
    const selectNode = document.createTextNode(selectValue);
    const dateNode = document.createTextNode(date);
    this.closeSpan = document.createElement("i");
    this.closeSpan.id = "CloseIcon";
    this.closeSpan.classList.add("close");
    this.closeSpan.classList.add("fas");
    this.closeSpan.classList.add("fa-trash-alt");

    const editSpan = document.createElement("i");
    editSpan.id = "EditIcon";
    editSpan.classList.add("edit");
    editSpan.classList.add("fas");
    editSpan.classList.add("fa-pencil-alt");
    const listing_section = document.querySelector(".listing_section");

    listing_section.appendChild(contains);
    div_input.appendChild(div_on);
    actualDiv.appendChild(input);
    actualDiv.appendChild(inputId);
    actualDiv.appendChild(dateSpan);
    actualDiv.appendChild(priorityFlag);
    div_input.appendChild(actualDiv);
    contains.appendChild(checkbox);
    contains.appendChild(div_input);
    contains.appendChild(div);
    div_input.appendChild(edited);
    edited.appendChild(editInput);
    edited.appendChild(select);
    edited.appendChild(Edit_date_wrapper);
    div.appendChild(this.closeSpan);
    div.appendChild(editSpan);
    switchs.appendChild(check_on);
    switchs.appendChild(span_inner);
    div_on.appendChild(switchs);

    checkbox.addEventListener("click", (e) => {
      var select_node = e.target.parentElement;
      checkbox.classList.add("done");
      select_node.classList.toggle("deleted");
    });
  }
}
