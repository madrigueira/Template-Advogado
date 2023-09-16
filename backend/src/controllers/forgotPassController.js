import ForgotPass from '../models/forgotPassModel.js'

import conversions from '../utils/conversions/conversions.js'

import mailer from '../config/mailer.js'
import hbs from 'handlebars'

import fs from 'fs'

const createForgotPass = async (email)=>{
  try {
    const newEmail = conversions.toEmail(email)

    //aqui voce vai ter que pesquisar o usuáriuo para validar se ele existe

    const forgot = new ForgotPass(newEmail)

    let now = new Date()
    now.setHours(now.getHours() + 1)

    forgot.setExpireDate(now)

    const id = await forgot.createForgotPass()

    if (!id){
      return false
    } else {
      return forgot
    }


  } catch (error) {
    console.log(`Erro ao criar forgotPass: ${error}`)
  }
}

export default { createForgotPass }