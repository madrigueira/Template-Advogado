export default class Returns {

  constructor() {
    this.status = ''
    this.message = ''
    this.content = null
  }

  setError(msg) {
    this.status = 'Error'
    this.message = msg
    this.content = null
  }

  setSuccess(msg = null, content = null) {
    this.status = 'Success'
    this.message = msg
    this.content = content
  }

  get(){
    return this
  }

}