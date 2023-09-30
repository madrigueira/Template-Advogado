import ForgotPass from '../models/forgotPassModel.js'
import userController from './userController.js'

import conversions from '../utils/conversions/conversions.js'

import Returns from '../models/returns.js'

import { admin } from '../config/database.js'

let returnGlobal = new Returns()

const createForgotPass = async (email)=>{
  try {
    const newEmail = conversions.toEmail(email)

    const user = await userController.getUserByEmail(newEmail)

    if (user.status != 'Success') {
      returnGlobal.setError('Usuário não encontrado')
      return returnGlobal.get()
    }

    const forgot = new ForgotPass(newEmail)

    let now = new Date()
    now.setHours(now.getHours() + 1)

    forgot.setExpireDate(now)

    const id = await forgot.createForgotPass()

    if (!id){
      returnGlobal.setError('Erro ao gerar código de validação')
      return returnGlobal.get()
    } else {
      returnGlobal.setSuccess(null, forgot)
      return returnGlobal.get()
    }

  } catch (error) {
    returnGlobal.setError(`Erro ao criar forgotPass: ${error}`)
    return returnGlobal.get()
  }
}

const validateForgotPass = async (email, code)=>{
  try{

    const forgot = new ForgotPass(email, code)

    const forgots = await forgot.get()

    if (forgots.length != 1) {
      returnGlobal.setError('Código inválido ou não encontrado')
      return returnGlobal.get()
    }

    const used = forgots[0].used.booleanValue || true

    if (used){
      returnGlobal.setError('Código já utilizado')
      return returnGlobal.get()
    }
  
    const nanoseconds = forgots[0].expire.mapValue.fields._nanoseconds.integerValue || 0
    const seconds = forgots[0].expire.mapValue.fields._seconds.integerValue || 0
    
    const expireDate = new Date(seconds * 1000 + nanoseconds / 1e6);
    const now = new Date()

    if (expireDate < now) {
      returnGlobal.setError('Código expirado')
      return returnGlobal.get()
    }
    
    await forgot.setUsed()

    returnGlobal.setSuccess()
    return returnGlobal.get()

  } catch (error){
    returnGlobal.setError(`Erro ao validar código: ${error}`)
    return returnGlobal.get()
  }
}

export default { createForgotPass, validateForgotPass }