<template>
  <div>
    <section class="container">
      <header>Create User</header>
      <form @submit.prevent="handleRegisterSubmit" class="form">
        <div class="input-box">
          <label for="full_name">Full Name</label>
          <input
            id="full_name"
            autocomplete="off"
            placeholder="Enter full name"
            type="text"
            v-model="formData.full_name"
          />
        </div>
        <div class="input-box">
          <label for="email">Email</label>
          <input
            id="email"
            required
            placeholder="Enter email"
            type="email"
            v-model="formData.email"
          />
        </div>
        <div class="input-box">
          <label for="password">Password</label>
          <input
            id="password"
            required
            placeholder="Enter password"
            type="password"
            v-model="formData.password"
          />
        </div>
        <button type="submit">Create User</button>
      </form>
    </section>
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
      full_name: '',
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
        const res = await axios.post('http://localhost:8080/api/signup', formData.value );
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

<style>
/* Add your styles here */
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
