export function initTodo() {
  const todoContainer = document.querySelector(".todo-module");

  const input = document.createElement("input");
  input.placeholder = "Enter a task...";

  const addBtn = document.createElement("button");
  addBtn.classList.add("btn", "btn-add-todo");
  addBtn.textContent = "Add";

  const list = document.createElement("ul");

  todoContainer.append(input, addBtn, list);

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(renderTodo);

  function renderTodo(todo) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.dataset.id = todo.id;
    li.textContent = todo.text;

    const delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-todo-delete");
    delBtn.textContent = "X";

    // Removing a to-do
    delBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id != todo.id);
      localStorage.setItem("todos", JSON.stringify(todos));
      li.remove();
    });

    li.append(delBtn);
    list.append(li);
  }

  addBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text) {
      const todo = { id: Date.now(), text };
      todos.push(todo);
      renderTodo(todo);
      input.value = "";
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addBtn.click();
  });
}
