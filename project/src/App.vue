<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Todo টাইপ
interface Todo {
  id: string
  text: string
  completed: boolean
}

const todos = ref<Todo[]>([])
const newTodo = ref<string>('')

// সব টুডু লোড করো
const fetchTodos = async () => {
  try {
    const res = await axios.get('http://localhost:5000/get')
    todos.value = res.data
  } catch (err) {
    console.error('Error fetching todos:', err)
  }
}

// নতুন টুডু যোগ করো
const addTodo = async () => {
  if (!newTodo.value.trim()) return
  try {
    const res = await axios.post('http://localhost:5000/post', {
      text: newTodo.value,
      completed: false,
    })
    todos.value.push(res.data)
    newTodo.value = ''
  } catch (err) {
    console.error('Error adding todo:', err)
  }
}

// টুডু টগল করো (complete/incomplete)
const toggleTodo = async (todo: Todo) => {
  try {
    todo.completed = !todo.completed
    await axios.put(`http://localhost:5000/put`, todo)
  } catch (err) {
    console.error('Error updating todo:', err)
  }
}

// টুডু ডিলিট করো
const deleteTodo = async (id: string) => {
  try {
    await axios.delete(`http://localhost:5000/delete`, { data: { id } })
    todos.value = todos.value.filter(todo => todo.id !== id)
  } catch (err) {
    console.error('Error deleting todo:', err)
  }
}

// ---- update the todo
const editingTodo = ref<Todo | null>(null)
const editedText = ref<string>('')

// টুডু আপডেট করো (text আপডেট করার জন্য)
const updateTodoText = async () => {
  if (!editingTodo.value || !editedText.value.trim()) return

  try {
    const updatedTodo = {
      ...editingTodo.value,
      text: editedText.value,
    }

    await axios.put('http://localhost:5000/put', updatedTodo)

    // লোকাল todos তালিকায় আপডেট
    const index = todos.value.findIndex(todo => todo.id === editingTodo.value?.id)
    if (index !== -1) {
      todos.value[index].text = editedText.value
    }

    editingTodo.value = null
    editedText.value = ''
  } catch (err) {
    console.error('Error updating text:', err)
  }
}


// পেজ লোড হলে ডেটা আনো
onMounted(fetchTodos)
</script>

<template>
  <main class="container">
    <h2>📝 My Todo List</h2>

    <form @submit.prevent="addTodo" class="todo-form">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Enter new todo"
      />
      <button type="submit">Add</button>
    </form>

    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <!-- যদি টুডু এখন এডিটিং হয় -->
        <div v-if="editingTodo && editingTodo.id === todo.id" class="edit-mode">
          <input v-model="editedText" />
          <button @click="updateTodoText">Save</button>
          <button @click="() => { editingTodo = null; editedText = '' }">Cancel</button>
        </div>

        <!-- নরমাল ভিউ -->
        <div v-else class="view-mode">
          <span
            :class="{ completed: todo.completed }"
            @click="toggleTodo(todo)"
          >
            {{ todo.text }}
          </span>
          <div class="btn-group">
            <button class="edit-btn" @click="() => { editingTodo = todo; editedText = todo.text }">Edit</button>
            <button class="delete-btn" @click="deleteTodo(todo.id)">Delete</button>
          </div>
        </div>
      </li>
    </ul>

  </main>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: #252525;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}
.todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.todo-form input {
  flex: 1;
  padding: 10px 15px;
  background-color: #242222;
  border: 1px solid #4e4747;
  color: aqua;
  border-radius: 8px;
  font-size: 16px;
}
.todo-form button {
  padding: 10px 25px;
  background-color: royalblue;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}
.todo-list {
  list-style: none;
  padding: 0;
}
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #1f1d1d;
}
.todo-item span {
  cursor: pointer;
  flex: 1;
}
.todo-item span.completed {
  text-decoration: line-through;
  color: gray;
}
.delete-btn {
  background: crimson;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
}

.edit-mode {
  display: flex;
  gap: 8px;
  width: 100%;
}
.edit-mode input {
  flex: 1;
  padding: 6px;
}
.view-mode {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.btn-group button {
  margin-left: 6px;
}
.edit-btn {
  background: orange;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
}


</style>
