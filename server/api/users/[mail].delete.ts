import { checkUserAuth } from '~~/server/lib/auth'
import { DbConnection } from '~~/server/lib/db'
const db = DbConnection.getInstance().getConnection()

/**
 * route : /api/users/[mail]
 * method : DELETE
 * Delete the user with the mail = to the route parameter
 */
export default defineEventHandler((event) => {
  // check if the connected user is the one with the email passed in parametter
  if (!checkUserAuth(event)) { return { error: true, message: "Le token d'authentification est invalide." } }
  // check if data exist to ensure the existence of db.data.users to ensure userIndex is a number
  if (!db.data) { return { error: true, message: "Erreur de connexion à la base de donnée"} }
  // find the index of the current user
  const userIndex = db.data.users.findIndex((user) => user.mail === event.context.params.mail)
  // check if the user has been found
  if (userIndex === -1) { return { error: true, message: "Aucun utilisateur trouvé avec cette adresse e-mail." } }

  // remove the user from the database
  db.data?.users.splice(userIndex, 1)
  db.write()
  return { success: true }
})