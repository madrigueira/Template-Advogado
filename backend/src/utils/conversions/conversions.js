
const toEmail = (email)=>{
  const newEmail = email.trim().toLowerCase()

  return newEmail
}

const toName = (name)=>{
  const newName = name.trim()

  return newName
}

const toUf = (uf)=>{
  const newUf = uf.trim().toUpperCase()

  return newUf
}

const toText = (text)=>{
  return text.trim()
}

const toCode = (code)=>{
  let newCode = parseInt(String(code).trim())
  return newCode
}

export default {
  toEmail,
  toName,
  toUf,
  toText,
  toCode
}