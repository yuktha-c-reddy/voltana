<template>
  <div>
    <h1 class="headings">Dashboard</h1>
   
    <div class="search-container">
      <input
      class="input"
        type="text"
        v-model="searchQuery"
        placeholder="Search by name, email, or role"
      />
    </div>
    <div class="table">
    <table class="category-table" v-if="filteredTables.length" >
      <thead class="category-thead">
        <tr>
          <th class="category-th">ID</th>
          <th class="category-th">Name</th>
          <th class="category-th">Email</th>
          <th class="category-th">Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="table in filteredTables" :key="table.id">
          <td class="category-td">{{ table.id }}</td>
          <td class="category-td">{{ table.name }}</td>
          <td class="category-td">{{ table.email }}</td>
          <td class="category-td">{{ table.role }}</td>
        </tr>
      </tbody>
    </table>
    
    <p v-else>No results found</p>
    </div>
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

<style>
.table{
  margin-top:5vh;
    display:flex;
  align-items:center;
  justify-content:center;
  overflow-x: auto;
}
.category-td , .category-th{
    border: 1px solid #34d5eb;
    padding: 8px;
    font-family:monospace;
    color:#34d5eb;
    font-weight: 500;
    text-align: left;
    font-size:1.2rem;
    word-wrap: break-word; 
}

.category-thead , .category-th{
    text-align: center;
    text-transform: uppercase;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 600;
    color:#ebc634; 
  font-size: 1.3rem;   
}


.search-container {
  margin: 10px 0;
   display:flex;
  align-items:center;
  justify-content:center;
}

.input {
  background-color:#000;
   border: 1px solid #ebc634;
   color:#ebc634;
  border-radius: 5px;
  padding: 10px;
  width: 30vw;
  outline: none;
  border-radius: 5px;
  box-shadow: 0 1px  gray;
  font-size: 18px;
  transition: width 0.3s;
  font-family: Consolas,monaco,monospace;
}

.input:focus {
  outline: 1px solid #ebc634;
  box-shadow: none;
  
}

.input::placeholder {
  color: #34d5eb;
}


.category-table {
  width: 90%; 
  max-width: 1200px; 
  border-collapse: collapse; 
}

@media (max-width: 768px) {
  .category-td, .category-th {
    font-size: 0.9rem; 
    padding: 6px; 
  }
  .category-table {
    width: 100%; 
  }
}

@media (max-width: 480px) {
  .category-td, .category-th {
    font-size: 0.8rem; 
    padding: 4px; 
  }
}



</style>
