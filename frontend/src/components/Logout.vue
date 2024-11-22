<template>
  <div>
    <button @click="handleLogout">Logout</button>
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
button {
  padding: 10px;
  background-color: #f44336; 
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #e53935;
}
</style>
