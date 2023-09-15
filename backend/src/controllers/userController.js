import { admin } from '../config/database.js'
import conversions from '../utils/conversions/conversions.js'
import userModel from '../models/userModel.js'

import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

import mailer from '../config/mailer.js'
import hbs from 'handlebars'

import fs from 'fs'

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

const updateUser = async (email, userName)=>{
  try {
    const newEmail = conversions.toEmail(email)
    const newName = conversions.toName(userName)

    const newUser = {
      name: newName,
      date_update: admin.firestore.Timestamp.fromDate(new Date())
    }

    const updated = await userModel.updateUserByEmail(newEmail, newUser)

    if (updated) {
      return true
    } else {
      return false
    }

  } catch (error) {
    console.log(`Erro ao atualizar usuário: ${error}`)
  }
}

const forgotPass = async (email)=>{
  try {
    const newEmail = conversions.toEmail(email)

    const user = await userModel.getUserByEmail(newEmail)

    if (!user[0]) return false

    let now = new Date()
    now.setHours(now.getHours() + 1)

    const forgot = {
      email: user[0].email.stringValue,
      uuid: uuid(),
      code: Math.floor(Math.random() * 10000),
      expire: admin.firestore.Timestamp.fromDate(now)
    }

    const id = await userModel.createForgotPass(forgot)

    if (!id){
      return false
    }

    const emailTemplate = fs.readFileSync('../view/templates/hbs/forgotPass.hbs', "utf8")

    const template = hbs.compile(emailTemplate)

    const htmlToSend = template({
      nome: user[0].name.stringValue,
      code: forgot.code
    })

    mailer.sendMail({
      to: forgot.email,
      from: process.env.EMAIL_ADDRESS,
      subject: 'Recuperação de senha teste',
      html: htmlToSend
    }, err =>{
      return false
    })

    return true

  } catch (error) {
    console.log(`Erro ao criar nova senha: ${error}`)
  }
}

console.log(await forgotPass('viniciusamirat39@gmail.com'))

export default { createUser, login, updateUser }