<template>
  <div class="form-box">
     <h1 class="headings">Update your details</h1>
   
      
      <form @submit.prevent="handleUpdateSubmit" class="form-input">
        <div class="input-box">
          
          <input
            id="userId"
            required
            class="input-form"
            placeholder="Enter your User ID"
            type="number"
            v-model="formData.userId"
          />
        </div>
        <div class="input-box">
          
          <input
            id="name"
            class="input-form"
            placeholder="Enter new full name (optional)"
            type="text"
            v-model="formData.name"
          />
        </div>
        <div class="input-box">
          
          <input
            id="email"
            placeholder="Enter new email (optional)"
            type="email"
            class="input-form"
            v-model="formData.email"
          />
        </div>
        <div class="input-box">
          
          <input
            id="password"
            class="input-form"
            placeholder="Enter new password (optional)"
            type="password"
            v-model="formData.password"
          />
        </div>
        <button class="button-confirm" type="submit">Update User</button>
      </form>
   
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

