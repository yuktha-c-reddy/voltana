<script setup>
import { RouterLink, RouterView } from 'vue-router'
import './components/styles.css';
</script>

<template>
  <header>
    
    <div class="wrapper" style="background-color:#000;">
      <nav class="navbar navbar-expand-lg" style=" font-size: 1rem;padding: 4px; background-color: #ebc634;">
  <div class="container-fluid" style="background-color: #ebc634;">
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 nav-menu">
        <li class="nav-item">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/dashboard">Dashboard</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/invite">Invite</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/delete">Delete</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/update">Update</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/logout">Logout</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </div>
  </header>

  <RouterView />
</template>

<style>
.nav-menu .nav-item {
  margin-right: 10vw; 
  font-family:monospace;
  align-items:center;
  font-size:1.2rem;
}

</style>
