import Api from '@/services/Api'

export default {
  getAPIData () {
    return Api().get('/')
  }
}
