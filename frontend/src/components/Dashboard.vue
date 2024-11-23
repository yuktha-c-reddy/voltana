<template>
  <div>
    <h1>Dashboard</h1>
    <button @click="$router.push('/invite')">Invite a user</button>
    <button @click="$router.push('/update')">Update a user</button>
    <button @click="$router.push('/delete')">Delete a user</button>
    
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by name, email, or role"
      />
    </div>

    <table v-if="filteredTables.length" border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="table in filteredTables" :key="table.id">
          <td>{{ table.id }}</td>
          <td>{{ table.name }}</td>
          <td>{{ table.email }}</td>
          <td>{{ table.role }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No results found</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tables: [],
      searchQuery: '', 
    };
  },
  computed: {
    // Filtered list of tables based on search query
    filteredTables() {
      const query = this.searchQuery.toLowerCase();
      return this.tables.filter((table) => {
        return (
          table.name.toLowerCase().includes(query) ||
          table.email.toLowerCase().includes(query) ||
          table.role.toLowerCase().includes(query)
        );
      });
    },
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8080/api/tables', {
        validateStatus: false,
      });
      this.tables = response.data;
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  },
};
</script>

<style scoped>
.search-container {
  margin: 10px 0;
}
.search-container input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
