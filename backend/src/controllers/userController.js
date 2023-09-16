import { admin } from '../config/database.js'
import conversions from '../utils/conversions/conversions.js'
import User from '../models/userModel.js'
import forgotPassController from '../controllers/forgotPassController.js'

import bcrypt from 'bcrypt'

import mailer from '../config/mailer.js'
import hbs from 'handlebars'

import fs from 'fs'

const createUser = async (email, password, fullName)=>{
  try {
    const newEmail = conversions.toEmail(email)
    const newName = conversions.toName(fullName)

    const salt = await bcrypt.genSalt(12)

    const newPass = await bcrypt.hash(password, salt)

    const user = new User(newEmail, newPass, newName)

    console.log(await user.createUser())

    return true

  } catch (error) {
    console.log(`Falha ao criar usuário: ${error}`)
  }
}

const login = async (email, password)=>{
  try {
    const newEmail = conversions.toEmail(email)

    const user = new User(newEmail)

    const doc = await user.getUserByEmail()

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

const updateUserName = async (email, userName)=>{
  try {
    const newEmail = conversions.toEmail(email)
    const newName = conversions.toName(userName)

    const newUser = new User(newEmail, null, newName)

    const updated = await newUser.updateUserByEmail()

    if (updated) {
      return true
    } else {
      return false
    }

  } catch (error) {
    console.log(`Erro ao atualizar usuário: ${error}`)
  }
}

const sendForgotPass = async (email)=>{
  try {
    const newEmail = conversions.toEmail(email)

    const user = new User(newEmail)

    const userSearched = await user.getUserByEmail()

    if (!userSearched[0]) return false

    const forgotCreated = await forgotPassController.createForgotPass(newEmail)

    if (!forgotCreated) return false

    const emailTemplate = fs.readFileSync('../view/templates/hbs/forgotPass.hbs', "utf8")

    const template = hbs.compile(emailTemplate)

    const htmlToSend = template({
      nome: userSearched[0].name.stringValue,
      code: forgotCreated.code
    })

    const sent = sendEmail(forgotCreated.email, process.env.EMAIL_ADDRESS, 'Esqueceu a senha novo', htmlToSend)

    if (!sent) return false

    return true

  } catch (error) {
    console.log(`Erro ao criar nova senha: ${error}`)
  }
}

const sendEmail = async (to, from, subject, html)=>{
  try {
    
    mailer.sendMail({
      to: to,
      from: from,
      subject: subject,
      html: html
    }, err =>{
      return false
    })

    return true

  } catch (error) {
    console.log(`Erro ao enviar email: ${error}`)
  }
}

export default { createUser, login, updateUserName, sendForgotPass }