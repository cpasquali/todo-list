import { TodoCard } from "./TodoCard";
import { useLocalStorage } from "../utils/TodoListContext";

export const TodoList = () => {
  const { filteredTodoList } = useLocalStorage();

  const completeTodos = filteredTodoList.filter((t) => t.isCompleted !== false);

  return (
    <section className="todo-list-container">
      <h2>Lista de Tareas</h2>
      {filteredTodoList && filteredTodoList.length > 0 ? (
        <section className="todos">
          {filteredTodoList.map((t) => (
            <TodoCard key={t.id} todo={t} />
          ))}
          <p className="total-complete">
            Total de tareas completadas: {completeTodos.length}/
            {filteredTodoList.length}
          </p>
        </section>
      ) : (
        <h2>Aun no se agregaron tareas...</h2>
      )}
    </section>
  );
};
