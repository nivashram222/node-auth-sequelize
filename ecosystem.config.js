require('dotenv').config() // load .env

module.exports = {
  apps: [
    {
      name: "auth-sequelize",
      script: "server.js",
      autorestart: true,
      watch: true, 
      max_memory_restart: '1G',
      env_development: {
        NODE_ENV: "development",
        PORT: process.env.PORT || 8525
      },      
      env_staging: {
        NODE_ENV: "stage",
        PORT: process.env.PORT || 8526
      },
      env_production: {
        NODE_ENV: "production",
        PORT: process.env.PORT
      }
    }
  ]
}
