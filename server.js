const express = require('express');  // Importing Express
const fs = require('fs');  // Importing the fs (File System) module for reading files
const app = express();  // Creating an Express app
const PORT = 5000;  // Defining the port for the server

// Route to handle requests to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});


//Adding a new route to the server

//Reading all users from users.json and returning them as a response
app.get('/users', (req, res) => {
    // Reading the contents of users.json file
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);  // Log error if reading fails
        res.status(500).send('Internal Server Error');  // Send an error response
        return;
      }
      res.send(JSON.parse(data));  // Parse and send the JSON data as response
    });
  });

  //Reading users by ID
  app.get('/users/:id', (req, res) => {
    // Parse the ID from the request parameters (from the URL) and convert it to an integer.
    const userId = parseInt(req.params.id);
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);  // Log error if reading fails
            res.status(500).send('Internal Server Error');  // Send an error response
            return;
          }
          const users = JSON.parse(data);
          //We’re using Object.values(users) to get an array of user objects,
         // then using find to look through each user and find the one whose id matches userId.
          const user = Object.values(users).find(u => u.id === userId);
          // Check if a user with the given ID was found.
        if (user) {
            res.send(user);
          } else {
            res.status(404).send('User not found');
          }
     });
 });

 //Reading users by profession
 app.get('/users/profession/:profession', (req, res) => {
    // Parse the profession from the request parameters (from the URL) and convert it to lower case.
    const profession = req.params.profession.toLowerCase();
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        const users = JSON.parse(data);
        //We’re using Object.values(users) to get an array of user objects,
        // filter is used instead of find here because multiple users may have the same profession,
        // and we want to return an array of all matches, not just the first one found.
        const usersByProfession = Object.values(users).filter(u => u.profession.toLowerCase() === profession);
        if (usersByProfession.length > 0) {
            res.send(usersByProfession);
          } else {
            res.status(404).send('No users found with that profession');
          }
    });
});

//Reading users by name
app.get('/users/name/:name', (req, res) => {
    // Parse the name from the request parameters (from the URL) and convert it to lower case.
    const name = req.params.name.toLowerCase();
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        const users = JSON.parse(data);
    const user = Object.values(users).find(u => u.name.toLowerCase() === name);  // Find user by name
    if (user) {
      res.send(user);
    } else {
      res.status(404).send('User not found');
    }
  });
});


// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});