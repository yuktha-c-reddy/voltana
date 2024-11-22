<template>
  <div>
    
    <h1>Dashboard</h1>
    <button @click="$router.push('/invite')">Invite a user</button>
    <button @click="$router.push('/update')">Update a user</button>
    <button @click="$router.push('/delete')">Delete a user</button>
    
    <table v-if="tables.length" border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="table in tables" :key="table.id">
          <td>{{ table.id }}</td>
          <td>{{ table.name }}</td>
          <td>{{ table.email }}</td>
          <td>{{ table.role }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Loading tables...</p>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  data() {
    return {
      tables: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8080/api/tables' ,  { validateStatus: false });
      this.tables = response.data;;
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  },
};
</script>

<style scoped>

</style>
