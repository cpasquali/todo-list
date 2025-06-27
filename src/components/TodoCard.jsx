import { useLocalStorage } from "../utils/TodoListContext";

export const TodoCard = ({ todo }) => {
  const { setTodoList } = useLocalStorage();

  const handleCompleteTask = () => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((t) => {
        if (t.id === todo.id) {
          return { ...t, isCompleted: !t.isCompleted };
        } else {
          return t;
        }
      })
    );
  };

  const handleRemoveTask = () => {
    setTodoList((prevTodoList) => prevTodoList.filter((t) => t.id !== todo.id));
  };

  const todoClass = todo.isCompleted ? "completed" : "";

  return (
    <article className={`todo-card ${todoClass}`}>
      <p onClick={handleCompleteTask}>{todo.description}</p>
      <div className="card-btn-container">
        <button className="card-btn" onClick={handleRemoveTask}>
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    </article>
  );
};
