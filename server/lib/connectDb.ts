import { Nitro } from 'nitropack';
import { DbConnection } from '~~/server/lib/db'

import defaultProducts from 'public/products.json' assert {type: 'json'};

// on a real app we should initialise the DB connection here
// here instead of connecting to a production DB we initialise an in file DB
export default async (_nitroApp: Nitro) => {
  const db = DbConnection.getInstance() // initialise instance of the database connection
  await db.connect() // connect database
  const connection = db.getConnection() // get the database connection
  // If the database file doesn't exist on the server db.data will be null
  // In this case we will initialize the database with default data
  if (!connection.data) {
    connection.data = { "products": defaultProducts.products, "users": [] }
    await connection.write() 
  }
  
};