import { admin } from '../config/database.js'
import conversions from '../utils/conversions/conversions.js'
import userModel from '../models/userModel.js'

import bcrypt from 'bcrypt'

const createUser = async (email, password, fullName)=>{
  try {
    const newEmail = conversions.toEmail(email)
    const newName = conversions.toName(fullName)

    const salt = await bcrypt.genSalt(12)

    const newPass = await bcrypt.hash(password, salt)

    const user = {
      email: newEmail,
      password: newPass,
      name: newName,
      date_include: admin.firestore.Timestamp.fromDate(new Date()),
      date_update: admin.firestore.Timestamp.fromDate(new Date())
    }

    const userId = await userModel.createUser(user)

    return true

  } catch (error) {
    console.log(`Falha ao criar usuário: ${error}`)
  }
}

const login = async (email, password)=>{
  try {
    const newEmail = conversions.toEmail(email)

    const doc = await userModel.getUserByEmail(newEmail)

    const validPass = await bcrypt.compare(password, doc[0].password.stringValue)

    if (!validPass) return false

    const userNoPass = {
      name: doc[0].name.stringValue,
      email: doc[0].email.stringValue
    }

    return userNoPass

  } catch (error) {
    console.log(`Falha ao realizar login: ${error}`)
  }
}

export default { createUser, login }