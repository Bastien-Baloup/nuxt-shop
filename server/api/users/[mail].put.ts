import { checkUserAuth, createToken } from '~~/server/lib/auth'
import { validateEmail } from '~~/server/lib/formValidation'
import { DbConnection } from '~~/server/lib/db'
const db = DbConnection.getInstance().getConnection()

interface Body {
  mail?: string,
  name?: string
}


/**
 * route : /api/users/[mail]
 * method : PUT
 * change name or email of the user with the mail = to the route parameter
 */
export default defineEventHandler(async (event) => {
  const body = await useBody<Body>(event)
  // check if form has been filled
  if(!body.mail && !body.name) { return { error: true, message: "Au moins un champ doit être remplis." } }
  // check if the connected user is the one with the email passed in parametter
  if (!checkUserAuth(event)) { return { error: true, message: "Le token d'authentification est invalide." } }
  // check if data exist to ensure the existence of db.data.users to ensure userIndex is a number
  if (!db.data) { return { error: true, message: "Erreur de connexion à la base de donnée"} }
  // find the index of the current user
  const userIndex = db.data.users.findIndex((user) => user.mail === event.context.params.mail)
  // check if the user has been found
  if (userIndex === -1) { return { error: true, message: "Aucun utilisateur trouvé avec cette adresse e-mail." } }

  // update the user in the database
  if (body.name) { db.data.users[userIndex].name = body.name.replace(/[^\w ]/g, '') }
  if (body.mail) {
    if (!validateEmail(body.mail)) { return { error: true, message: "L'adresse e-mail n'est pas valide." } }
    db.data.users[userIndex].mail = body.mail
  }
  db.write()

  if (body.mail) {
    // create a new authentification token
    const token = createToken(db.data.users[userIndex])
    return { success: true, mail: db.data.users[userIndex].mail, token: token }
  }
  return { success: true }
})