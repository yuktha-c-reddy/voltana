<template>
  <div>
    <section class="container">
      <header>Delete User</header>
      <form @submit.prevent="handleDeleteSubmit" class="form">
        <div class="input-box">
          <label for="user_id">Your User ID</label>
          <input
            id="user_id"
            required
            placeholder="Enter your User ID"
            type="number"
            v-model="userId"
          />
        </div>
        <button type="submit">Delete My Account</button>
      </form>
    </section>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

export default {
  data() {
    return {
      userId: '', 
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute(); 

    return { router, route }; 
  },
  methods: {
    async handleDeleteSubmit() {
      const token = localStorage.getItem('authToken'); 
      if (!token) {
        alert('Please log in first');
        this.router.push('/'); // Redirect to login
        return;
      }

      try {

        const res = await axios.delete(
          `http://localhost:8080/api/delete/${this.userId}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );

        if (res.status === 204) {
          alert('Your account has been deleted');
          localStorage.removeItem('authToken'); // Clear the token
          router.push('/login'); // Redirect to login
        } else {
          alert('Failed to delete user. Please try again.');
        }
      } catch (err) {
        if (err.response && err.response.data.error) {
          alert(err.response.data.error); 
        } else {
          console.error('Network or other error:', err.message);
          alert('Error: Unable to delete account. Check server connection.');
        }
      }
    },
  },
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
  background-color: #d9534f; 
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #c9302c;
}
</style>
