import { Nitro } from 'nitropack';
import { Db } from './db'

import defaultProducts from 'public/products.json' assert {type: 'json'};

// on a real app we should initialise the DB connection here
// here instead of connecting to a production DB we initialise an in file DB
export default async (_nitroApp: Nitro) => {
  
  const db = new Db().getInstance()
  await db.read()
  // If the db.json file doesn't exist on the server, db.data will be null and we will initialize default data
  db.data ||= { "products": defaultProducts.products , "users": []}
  await db.write()
};