<template>
  <div class="form-box">
 <h1 class="headings">Click here</h1>
   
    <button class="logout-button" @click="handleLogout">LOGOUT</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();  // Use the router instance in setup

    const handleLogout = () => {
      localStorage.removeItem('authToken');
      router.push('/');
    };

    return {
      handleLogout
    };
  }
};
</script>

<style>
.logout-button{
    font-family:monospace;
    margin: 50px auto 0 auto;
    width: 20vw;
    height: 6vh;
    border-radius: 5px;
    border: 2px solid #edc835;
    background-color: var(--bg-color);
    box-shadow: 4px 4px #edc835;
    font-size: 17px;
    font-weight: 600;
    color: #edc835;
    cursor: pointer;
  }
</style>