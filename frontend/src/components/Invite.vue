<template>
  <div class="form-box">
   
       <h1 class="headings">Invite user!</h1>

      <form @submit.prevent="handleRegisterSubmit" class="form-input">
        <div class="input-box">
          
          <input
            id="name"
            autocomplete="off"
            placeholder="Enter full name"
            type="text"
            class="input-form"
            v-model="formData.name"
          />
        </div>
        <div class="input-box">
         
          <input
            id="email"
            required
            placeholder="Enter email address"
            type="email"
            class="input-form"
            v-model="formData.email"
          />
        </div>
        <div class="input-box">
          
          <input
            id="password"
            required
            class="input-form"
            placeholder="Enter password"
            type="password"
            v-model="formData.password"
          />
        </div>
        <button  class="button-confirm" type="submit">Create User</button>
      </form>
  
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'CardSwitch',
  setup() {
    const router = useRouter();
    const formData = ref({
      name: '',
      email: '',
      password: '',
    });


    const validateRegister = () => {
      if (!registerData.value.name || !registerData.value.email || !registerData.value.password) {
        alert('Please fill in all fields.');
        return false;
      }
      return true;
    };

    const handleRegisterSubmit = async () => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/signup`, formData.value );
        alert("Signup successful");
        console.log('Signup successful:', res.data);
      } catch (err) {
        if (err.response) {
          console.error('Signup error:', err.response.data);
          alert('Signup failed: ' + (err.response.data.message));
        } else {
          console.error('Network or other error:', err.message);
          alert('Signup failed due to network error or server not responding.');
        }
      }
    };

    return {
      formData,
      handleRegisterSubmit,
    };
  },
};
</script>

