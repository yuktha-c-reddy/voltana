<template>
  <div>
    <label class="switch">
      <input
        type="checkbox"
        class="toggle"
        @change="handleToggle"
        :checked="isLogin"
      />
      <span class="slider"></span>
      <span class="card-side"></span>
    </label>

    <div class="wrapper">
      <div class="flip-card__inner">
        <div v-if="isLogin" class="flip-card__front">
          <form class="form-input" @submit.prevent="handleLoginSubmit">
            <div class="title">LOG IN</div>
            <input
              class="input-form"
              name="email"
              placeholder="Email"
              type="email"
              v-model="loginData.email"
              autocomplete="off"
            />
            <input
              class="input-form"
              name="password"
              placeholder="Password"
              type="password"
              v-model="loginData.password"
            />
            <button class="button-confirm">LET'S GO!</button>
          </form>
        </div>
        <div v-else class="flip-card__back">
          <form class="form-input" @submit.prevent="handleRegisterSubmit">
            <div class="title">SIGN UP</div>
            <input
              class="input-form"
              placeholder="User Name"
              type="text"
              name="name"
              autocomplete="off"
              v-model="registerData.name"
            />
            <input
              class="input-form"
              name="email"
              placeholder="Email"
              type="email"
              autocomplete="off"
              v-model="registerData.email"
            />
            <input
              class="input-form"
              name="password"
              placeholder="Set Password"
              type="password"
              v-model="registerData.password"
            />
            <button class="button-confirm">CONFIRM!</button>
          </form>
        </div>
      </div>
    </div>
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

    const isLogin = ref(true);
    const loginData = ref({
      email: '',
      password: '',
    });
    const registerData = ref({
      name: '',
      email: '',
      password: '',
    });

    const isLoading = ref(false);

    const handleToggle = () => {
      isLogin.value = !isLogin.value;
    };

    const validateRegister = () => {
      if (!registerData.value.name || !registerData.value.email || !registerData.value.password) {
        alert('Please fill in all fields.');
        return false;
      }
      return true;
    };

    const handleLoginSubmit = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData.value),
        });
      
        const result = await response.json();
        if (result.token) {
          
          localStorage.setItem('authToken', result.token); 
          router.push('/dashboard');
          
        } else {
          alert('Login failed: ' + (result.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };

    const handleRegisterSubmit = async () => {
      try {
        const res = await axios.post('http://localhost:8080/api/signup', registerData.value );
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
      isLogin,
      loginData,
      registerData,
      handleToggle,
      handleLoginSubmit,
      handleRegisterSubmit,
    };
  },
};
</script>


