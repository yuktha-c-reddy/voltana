<template>
  <div>
    <section class="container">
      <header>Delete User</header>
      <form @submit.prevent="handleDeleteSubmit" class="form">
        <div class="input-box">
          <label for="user_id">User ID</label>
          <input
            id="user_id"
            required
            placeholder="Enter User ID"
            type="number"
            v-model="userId"
          />
        </div>
        <button type="submit">Delete User</button>
      </form>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: '' 
    };
  },
  methods: {
    async handleDeleteSubmit() {
      try {
        const res = await axios.delete(`http://localhost:8080/api/delete/${this.userId}`); // Use dynamic ID
      
        if (res.status === 200) {
          alert('User deleted successfully');
        } else {
          alert('Failed to delete user. Please check the ID and try again.');
        }
      } catch (err) {
        if (err.response) {
          console.error('Error deleting user:', err.response.data);
          alert('Error: ' + err.response.data.message);
        } else {
          console.error('Network or other error:', err.message);
          alert('Error: Unable to delete user. Check the server connection.');
        }
      }
    }
  }
};
</script>

<style>
/* Reuse the same styles from the form */
.container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.header {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}
.input-box {
  margin-bottom: 15px;
}
.input-box label {
  display: block;
  margin-bottom: 5px;
}
.input-box input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #d9534f; /* Red for delete */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #c9302c;
}
</style>
