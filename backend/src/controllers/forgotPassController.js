import ForgotPass from '../models/forgotPassModel.js'
import userController from './userController.js'

import conversions from '../utils/conversions/conversions.js'

import Returns from '../models/returns.js'

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

export default { createForgotPass }