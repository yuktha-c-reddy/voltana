<template>
  <div>
  <div class="switch-div">
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
    </div>

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
            <button class="button-confirm">GO!</button>
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
            <button class="button-confirm">DONE!</button>
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
        console.log(`${import.meta.env.VITE_API_BASE_URL}`);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
          'Cache-Control': 'no-cache' },
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
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}api/signup`, registerData.value );
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
<style scoped>
:root {
  background-color: #000;
  font-family:monospace;
}

.form-box{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.form-input{
    --input-focus: #34d5eb;
    --font-color: #34d5eb;
    --font-color-sub: #34d5eb;
    --bg-color: rgb(15, 15, 15);
    --main-color: #edc835;
    padding: 2vw;
    background:#000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    width: 50vw;
    
  }
  .title {
    color: var(--font-color);
    font-weight: 900;
    font-size: 3vh;
    margin-bottom: 25px;
  }
  .title span {
    color: #000;
    font-weight: 600;
    font-size: 17px;
  }
  .input-form{
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  } 
  .input:focus {
    border: 2px solid var(--input-focus);
  }
  .button-log:active, .button-confirm:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }
  
  .button-confirm {
    margin: 50px auto 0 auto;
    width: 20vw;
    height: 6vh;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--font-color);
    cursor: pointer;
  }
  .wrapper{
    margin-top: 0.5cm;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .switch {
    --input-focus: #34d5eb;
    --bg-color: #fff;
    --bg-color-alt: white;
    --main-color: #edc835;
    --input-out-of-focus: #f9eb21;
    flex-direction: column;
    gap: 30px;
    width: 6rem;
    height: 4.3vh;
    transform: translateX(calc(50% - 10px));
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5vh;
  }
  
  .toggle {
    opacity: 0;
  }
  
  .slider {
    box-sizing: border-box;
    border-radius: 100px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--input-out-of-focus);
    transition: 0.3s;
  }
  
  .slider:before {
    content: "";
    box-sizing: border-box;
    height: 30px;
    width: 30px;
    position: absolute;
    left: 2px;
    bottom: 1px;
    border: 2px solid var(--main-color);
    border-radius: 100px;
    background-color: var(--bg-color);
    color: var(--main-color);
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    line-height: 25px;
    transition: 0.3s;
  }
  
  .toggle:checked + .slider {
    background-color: var(--input-focus);
    transform: translateX(-30px);
  }
  
  .toggle:checked + .slider:before {
    content: "";
    transform: translateX(55px);
  }
.switch-div{
  display:flex;
  align-items:center;
  justify-content:center;
}
</style>