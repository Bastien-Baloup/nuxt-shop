import { DbConnection } from '~~/server/lib/db'
const db = DbConnection.getInstance().getConnection()

/**
 *  route : /api/products
 *  method : GET
 *  Return the list of all products in the database
 */
export default defineEventHandler((event) => {
  return { success: true, products: db.data?.products || null }
})