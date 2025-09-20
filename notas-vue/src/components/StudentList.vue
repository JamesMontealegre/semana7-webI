<template>
  <section>
    <h2>Lista de Estudiantes</h2>
    <ul v-if="students.length > 0">
      <li v-for="(s, i) in students" :key="i">
        <strong>{{ s.name }}</strong> - Promedio: {{ s.avg.toFixed(2) }}
        <button class="delete-btn" @click="$emit('delete-student', i)">
          ❌
        </button>
      </li>
    </ul>
    <p v-else>No hay estudiantes registrados</p>
  </section>
</template>

<script setup>
defineProps({
  students: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  background: #eee;
  margin: 5px 0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-btn {
  background: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
}

.delete-btn:hover {
  background: #c0392b;
}
</style>
