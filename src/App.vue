<template>
  <div class="container">
    <AddTodo @added="handleAddTodo" />
    <h3>Pending Tasks:</h3>
    <TodoLists status="pending" />

    <h3>Completed Tasks:</h3>
    <TodoLists status="completed" />
    <div class="pending-tasks">
      <span>You have <span class="pending-num"> {{ nbOfTodo }} </span> tasks
        pending.</span>
    </div>
    <button class="clear-button" @click="clearAllTodos">Clear All</button>
  </div>
</template>
<script>
import { mapState } from "pinia";
import AddTodo from "./components/AddTodo.vue";
import TodoLists from "./components/TodoList.vue";

import { useTodoStore } from "./stores/todo";
export default {
  name: "App",
  setup() {
    const store = useTodoStore();
    return {
      store,
    };
  },
  components: {
    AddTodo,
    TodoLists,
  },
  computed: {
    ...mapState(useTodoStore, {
      nbOfTodo: "countTodos",
    }),
  },
  methods: {
    handleAddTodo(todo) {
      console.log("Nouveau todo reçu :", todo); // <== AJOUTE ICI
      this.store.addTodo(todo);
    },
    clearAllTodos() {
      console.log("clear");
      this.store.clearAll();
    },
  },
};
</script>
<style>
@import "https://unicons.iconscout.com/release/v4.0.0/css/line.css";
</style>
