const sql = require("mssql");
const dbConfig = require("../dbConfig");

class User {
    constructor(id, username, email) {
      this.id = id;
      this.username = username;
      this.email = email;
    }

    static async createUser(user) {
        const connection = await sql.connect(dbConfig);
    
        // Define the SQL query with placeholders
        const sqlQuery = `INSERT INTO Users (username, email)
                          VALUES (@username, @email);`;
    
        // Prepare the request object
        const request = connection.request();
    
        // Add parameters to the request
        request.input('username', user.username);
        request.input('email', user.email);
    
        try {
            // Execute the query
            const result = await request.query(sqlQuery);
            console.log("User created successfully");
            return result;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error; // Rethrow the error to handle it in the caller function
        } finally {
            // Close the database connection
            connection.close();
        }
    }

    static async getAllUsers() {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM Users;`; 
    
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset.map(
          (row) => new User(row.id, row.username, row.email)
        ); // Convert rows to User objects
    }
    
    static async getUserById(id) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM Users WHERE id = @id`; // Parameterized query
    
        const request = connection.request();
        request.input("id", id);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset[0]
          ? new User(
              result.recordset[0].id,
              result.recordset[0].username,
              result.recordset[0].email
            )
          : null; // Handle book not found
    }

    static async updateUser(id, updatedUser) {
        const connection = await sql.connect(dbConfig);
    
        // Define the SQL UPDATE statement with placeholders
        const sqlQuery = `UPDATE Users 
                          SET username = @username, email = @email
                          WHERE id = @id;`;
    
        // Prepare the request object
        const request = connection.request();
    
        // Add parameters to the request
        request.input('id', id);
        request.input('username', updatedUser.username);
        request.input('email', updatedUser.email);
    
        try {
            // Execute the query
            const result = await request.query(sqlQuery);
            console.log(`User with ID ${id} updated successfully`);
            return result;
        } catch (error) {
            console.error("Error updating user:", error);
            throw error; // Rethrow the error to handle it in the caller function
        } finally {
            // Close the database connection
            connection.close();
        }
    }
    
    static async deleteUser(id) {
        const connection = await sql.connect(dbConfig);
    
        // Define the SQL DELETE statement with placeholders
        const sqlQuery = `DELETE FROM Users WHERE id = @id;`;
    
        // Prepare the request object
        const request = connection.request();
    
        // Add parameter to the request
        request.input('id', id);
    
        try {
            // Execute the query
            const result = await request.query(sqlQuery);
            if (result.rowsAffected[0] === 1) {
                console.log(`User with ID ${id} deleted successfully`);
                return "User deleted successfully";
            } else {
                console.log(`User with ID ${id} not found`);
                return "User not found";
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error; // Rethrow the error to handle it in the caller function
        } finally {
            // Close the database connection
            connection.close();
        }
    }

    static async searchUsers(searchTerm) {
        console.log("hello u fuckking retard");
        const connection = await sql.connect(dbConfig);
        console.log("sorry im a fucking retard!");
        const query = `
        SELECT *
        FROM Users
        WHERE username LIKE '%@searchTerm%'
          OR email LIKE '%@searchTerm%'
        `;
        console.log(searchTerm);
        const request = connection.request();

        request.input('searchTerm', searchTerm);

        try {
          const result = await request.query(query);
          console.log("balls" + result);
          return result.recordset;
        } catch (error) {
          throw new Error("Error searching users"); // Or handle error differently
        } finally {
          await connection.close(); // Close connection even on errors
        }
    }
    
  }
  
  module.exports = User;