import { admin } from '../config/database.js'
import conversions from '../utils/conversions/conversions.js'
import User from '../models/userModel.js'
import forgotPassController from '../controllers/forgotPassController.js'

import bcrypt from 'bcrypt'

import mailer from '../config/mailer.js'
import hbs from 'handlebars'

import fs from 'fs'

import Returns from '../models/returns.js'

let returnGlobal = new Returns()

const createUser = async (email, password, fullName)=>{
  try {
    const newEmail = conversions.toEmail(email)
    const newName = conversions.toName(fullName)

    const salt = await bcrypt.genSalt(12)

    const newPass = await bcrypt.hash(password, salt)

    const user = new User(newEmail, newPass, newName)

    const id = await user.createUser()

    if (!id) {
      returnGlobal.setError(`Erro ao criar usuário`)
      return returnGlobal.get()
    }

    returnGlobal.setSuccess()
    return returnGlobal.get()

  } catch (error) {
    returnGlobal.setError(`Erro ao criar usuário: ${error}`)
    return returnGlobal.get()
  }
}

const getUserByEmail = async (email)=>{
  try {
    const newEmail = conversions.toEmail(email)

    const user = new User(newEmail)

    const doc = await user.getUserByEmail()

    if (doc.length != 1) {
      returnGlobal.setError(`Usuário não encontrado`)
      return returnGlobal.get()
    } 

    const userNoPass = {
      name: doc[0].name.stringValue,
      email: doc[0].email.stringValue
    }

    returnGlobal.setSuccess(null, userNoPass)
    return returnGlobal.get()

  } catch (error) {
    returnGlobal.setError(`Falha ao localizar usuário: ${error}`)
    return returnGlobal.get()
  }
}

const login = async (email, password)=>{
  try {
    const newEmail = conversions.toEmail(email)

    const user = new User(newEmail)

    const doc = await user.getUserByEmail()

    const validPass = await bcrypt.compare(password, doc[0].password.stringValue)

    if (!validPass) {
      returnGlobal.setError(`Falha ao realizar login`)
      return returnGlobal.get()
    } 

    const userNoPass = {
      name: doc[0].name.stringValue,
      email: doc[0].email.stringValue
    }

    returnGlobal.setSuccess(null, userNoPass)
    return returnGlobal.get()

  } catch (error) {
    returnGlobal.setError(`Falha ao realizar login: ${error}`)
    return returnGlobal.get()
  }
}

const updateUserName = async (email, userName)=>{
  try {
    const newEmail = conversions.toEmail(email)
    const newName = conversions.toName(userName)

    const newUser = new User(newEmail, null, newName)

    const updated = await newUser.updateUserByEmail()

    if (updated) {
      returnGlobal.setSuccess()
      return returnGlobal.get()
    } else {
      returnGlobal.setError(`Erro ao atualizar usuário`)
      return returnGlobal.get()
    }

  } catch (error) {
    returnGlobal.setError(`Erro ao atualizar usuário: ${error}`)
    return returnGlobal.get()
  }
}

const sendForgotPass = async (email)=>{
  try {
    const newEmail = conversions.toEmail(email)

    const user = new User(newEmail)

    const userSearched = await user.getUserByEmail()

    if (!userSearched[0]) {
      returnGlobal.setError('Usuário não encontrado')
      return returnGlobal.get()
    }

    const forgotCreated = await forgotPassController.createForgotPass(newEmail)

    if (!forgotCreated.content) {
      returnGlobal.setError('Erro ao gerar código de validação')
      return returnGlobal.get()
    }

    const emailTemplate = fs.readFileSync('../view/templates/hbs/forgotPass.hbs', "utf8")

    const template = hbs.compile(emailTemplate)

    const htmlToSend = template({
      nome: userSearched[0].name.stringValue,
      code: forgotCreated.content.code
    })

    const sent = sendEmail(forgotCreated.content.email, process.env.EMAIL_USER, 'Esqueceu a senha novo', htmlToSend)
    
    if (!sent.status == 'Success') {
      returnGlobal.setError('Erro ao enviar e-mail')
      return returnGlobal.get()
    }

    returnGlobal.setSuccess()
    return returnGlobal.get()

  } catch (error) {
    returnGlobal.setError(`Erro ao criar nova senha: ${error}`)
    return returnGlobal.get()
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
      returnGlobal.setError(`Erro ao enviar e-mail: ${err}`)
      return returnGlobal.get()
    })

    returnGlobal.setSuccess()
    return returnGlobal.get()

  } catch (error) {
    returnGlobal.setError(`Erro ao enviar email: ${error}`)
    return returnGlobal.get()
  }
}

export default { 
  createUser
  , login
  , updateUserName
  , sendForgotPass
  , getUserByEmail 
}