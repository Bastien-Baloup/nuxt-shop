import { DbConnection } from '~~/server/lib/db'
const db = DbConnection.getInstance().getConnection()

/**
 * route : /api/products/categories
 * method : GET
 * Return all the products categories
 */
export default defineEventHandler((event) => {
  /*
  Here to get the list of categories we first create an array containing all category fields from the products using the map() function :
    array = products.map((product) => product.category)
  Then we create a new array containing only the uniques values from the category field using a intermediary set that we spread in the new array
    categories = [... new Set(array)]
  */
  return { success: true, categories: [...new Set(db.data?.products.map((product) => product.category))] || null }
})