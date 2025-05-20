<template>
  <div class="input-field">
    <textarea
      @keyup.enter.prevent="addTodo"
      ref="input"
      placeholder="Enter your new todo"
    ></textarea>
    <i class="uil uil-notes note-icon"></i>
  </div>
</template>
<script>
export default {
  methods: {
    addTodo(e) {
      this.$emit("added", e.target.value);
      this.$refs.input.value = null;
    },
  },
};
</script>
