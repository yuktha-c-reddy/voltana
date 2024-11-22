<template>
  <div>
    <section class="container">
      <header>Update User Information</header>
      <form @submit.prevent="handleUpdateSubmit" class="form">
        <div class="input-box">
          <label for="full_name">Full Name</label>
          <input
            id="full_name"
            placeholder="Enter new full name (optional)"
            type="text"
            v-model="formData.full_name"
          />
        </div>
        <div class="input-box">
          <label for="email">Email</label>
          <input
            id="email"
            placeholder="Enter new email (optional)"
            type="email"
            v-model="formData.email"
          />
        </div>
        <div class="input-box">
          <label for="password">Password</label>
          <input
            id="password"
            placeholder="Enter new password (optional)"
            type="password"
            v-model="formData.password"
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        full_name: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async handleUpdateSubmit() {
      const updatedData = {};

      if (this.formData.full_name) updatedData.full_name = this.formData.full_name;
      if (this.formData.email) updatedData.email = this.formData.email;
      if (this.formData.password) updatedData.password = this.formData.password;

      try {
        const res = await axios.put(`http://localhost:8080/api/update/$id`, updatedData);
        if (res.status === 200) {
          alert('User updated successfully');
        }
      } catch (err) {
        if (err.response) {
          console.error('Error updating user:', err.response.data);
          alert('Error: ' + err.response.data.message);
        } else {
          console.error('Network or other error:', err.message);
          alert('Error: Unable to update user. Check the server connection.');
        }
      }
    }
  }
};
</script>

<style>
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
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
