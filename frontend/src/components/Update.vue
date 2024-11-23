<template>
  <div>
    <section class="container">
      <header>Update User Information</header>
      <form @submit.prevent="handleUpdateSubmit" class="form">
        <div class="input-box">
          <label for="userId">Your User ID</label>
          <input
            id="userId"
            required
            placeholder="Enter your User ID"
            type="number"
            v-model="formData.userId"
          />
        </div>
        <div class="input-box">
          <label for="name">Full Name</label>
          <input
            id="name"
            placeholder="Enter new full name (optional)"
            type="text"
            v-model="formData.name"
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
        userId: '', 
        name: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async handleUpdateSubmit() {
      const updatedData = {};
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

      // Only include fields with values in the request
      if (this.formData.name) updatedData.name = this.formData.name;
      if (this.formData.email) updatedData.email = this.formData.email;
      if (this.formData.password) updatedData.password = this.formData.password;
        console.log(this.formData.userId);
      try {
        const res = await axios.put(
          `http://localhost:8080/api/update/${this.formData.userId}`,
          updatedData,
          {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          }
        );

        if (res.status === 200) {
          alert('User updated successfully');
        }
      } catch (err) {
        if (err.response) {
          console.error('Error updating user:', err.response.data);
          alert('Error: ' + (err.response.data.message || 'Failed to update user'));
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
