import { DbConnection } from '../../lib/db'
const db = DbConnection.getInstance().getConnection()

/**
 *  route : /api/products/
 *  method : GET
 *  Return the list of all products in the database
 */
export default defineEventHandler((event) => {
  return { products: db.data?.products || null }
})