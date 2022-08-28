import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuidV4 } from 'uuid'
import { validateEmail } from '~~/server/lib/formValidation'
import { createToken } from '~~/server/lib/auth'
import { DbConnection } from '~~/server/lib/db'
const db = DbConnection.getInstance().getConnection()

interface Body {
  name: string,
  mail: string,
  password: string
}

/**
 *  route : /api/users/register
 *  method : POST
 *  Register a user
 */
export default defineEventHandler(async (event) => {
  const body = await useBody<Body>(event)
  let user = db.data?.users.find((user) => user.mail === body.mail ) || null
  if (user) {
    return { error: true, message: "Cette adresse e-mail est déjà utilisée." }
  } else {
    // check if form is completed
    if(!body.name) { return { error: true, message: "Tous les champs doivent être remplis." }}
    if(!body.mail) { return { error: true, message: "Tous les champs doivent être remplis." }}
    if (!body.password) { return { error: true, message: "Tous les champs doivent être remplis." } }
    // check if e-mail is valid
    if(!validateEmail(body.mail)) { return { error: true, message: "L'adresse e-mail n'est pas valide." }}
    
    // create the password hash and return an api reposnse in case of error
    let hash: string
    try {
      hash = await bcrypt.hash(body.password, 12)
    } catch (err) {
      console.log(err)
      return { error: true, message: "Bcrypt n'a pas réussi à encrypter le mot de passe." }
    }
    
    // create the user object and store it in the database
    user = {
      name: body.name.replace(/[^\w ]/g, ''),
      mail: body.mail,
      hash: hash,
      lists: [],
      uuid: uuidV4()
    }
    db.data?.users.push(user)
    await db.write()
    // create an authentification token
    const token = createToken(user)

    return { success: true, mail: user.mail, token: token }
  }
})