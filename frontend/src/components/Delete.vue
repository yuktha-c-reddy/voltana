<template>
  <div class="form-box">
<h1 class="headings">Delete account</h1>
   
  
      <form @submit.prevent="handleDeleteSubmit" class="form-input">
        <div class="input-box">
          
          <input
            id="user_id"
            required
            class="input-form"
            placeholder="Enter your User ID"
            type="number"
            v-model="userId"
          />
        </div>
        <button  class="button-confirm" type="submit">Delete My Account</button>
      </form>
 
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

