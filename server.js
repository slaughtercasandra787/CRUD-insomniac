const express = require('express');
const routes = require('./Develop/routes');
// import sequelize connection
const sequelize = require('./Develop/config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully!'); 
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
});
})
.catch(error => { // Handle errors with .catch()
  console.error('Unable to sync database:', error);
});