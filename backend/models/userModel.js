
const pool = require('./db'); 

// Create a new user
const createUser = async (name, email, password, role) => {
  const result = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, password, role || 'user']
  );
  return result.rows[0];
};

// for table display
const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  console.log(result);
  return result.rows;
};

// Update a user
const updateUser = async (id, name, email, role) => {
  const result = await pool.query(
    'UPDATE users SET name = $1, email = $2, role = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
    [name, email, role, id]
  );
  return result.rows[0];
};


const findById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1'; 
  try {
    const result = await pool.query(query, [id]); 
    if (result.rows.length === 0) {
      return null; 
    }
    return result.rows[0]; 
  } catch (err) {
    throw new Error('Database error: ' + err.message); 
  }
};

// Delete a user
const deleteUser = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1'; 
  try {
    await pool.query(query, [id]); 
  } catch (err) {
    throw new Error('Database error: ' + err.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  findById,
  deleteUser,
};
