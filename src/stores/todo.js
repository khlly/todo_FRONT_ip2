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
        this.todos = response.data;
        console.log("Fetched from backend:", this.todos);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    },
    async toggleStatus(id) {
      const foundIndex = this.todos.findIndex((t) => t.id == id);
      if (foundIndex >= 0) {
        try {
          if (this.todos[foundIndex].completedAt != null) {
            // pending
            await axios.patch(`http://localhost:3100/tasks/${id}/pending`);
            this.todos[foundIndex].completedAt = null;
          } else {
            // done
            await axios.patch(`http://localhost:3100/tasks/${id}/done`);
            this.todos[foundIndex].completedAt = new Date().toISOString();
          }
        } catch (error) {
          console.error('Failed to toggle task status:', error);
        }
      }
    },
    async addTodo(todoName) {
      try {
        const response = await axios.post("http://localhost:3100/tasks", {
          name: todoName,
          description: "Add from the frontend",
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
    },
    /*async removeCompletedTodos() {
      const completed = this.todos.filter(t => t.completedAt != null);
    
      for (const todo of completed) {
        try {
          await axios.delete(`http://localhost:3100/tasks/${todo.id}`);
          console.log(`Deleted completed todo: ${todo.id}`);
        } catch (error) {
          console.error(`Failed to delete todo ${todo.id}:`, error);
        }
      }
      this.todos = this.todos.filter(t => t.completedAt == null);
    }    
*/
  },
});
