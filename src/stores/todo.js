import { defineStore } from "pinia";
import axios from "axios";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  getters: {
    countTodos: (state) => state.todos.length,
  },
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get('http://localhost:3100/tasks');
        this.todos = response.data; // assuming the API returns an array of todos
        console.log("Fetched from backend:", this.todos);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    },
    toggleStatus(id) {
      const foundIndex = this.todos.findIndex((t) => t.id == id);
      if (foundIndex >= 0) {
        if (this.todos[foundIndex].completedAt != null) {
          this.todos[foundIndex].completedAt = null;
        } else {
          this.todos[foundIndex].completedAt = new Date().toISOString();
        }
      }
    },
    async addTodo(todoName) {
      try {
        const response = await axios.post("http://localhost:3100/tasks", {
          name: todoName,
          description: "Ajouté depuis le frontend",
          user: { id: 1 }, 
        });
        this.todos.push(response.data); 
        console.log("Todo added to backend:", response.data);
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    },
    async clearAll() {
      try {
        for (const todo of this.todos) {
          await axios.delete(`http://localhost:3100/tasks/${todo.id}`);
        }
        this.todos = [];
        console.log("All the tasks were deleted");
      } catch (error) {
        console.error("Failed to deleted the tasks :", error);
      }
    }
  },
});
