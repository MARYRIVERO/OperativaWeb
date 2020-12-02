import Api from '../axios';

export default class UserService {

  // Login
  static async signIn(user) {
    const response = await Api.post('/auth/login', user);
    return response.data;
  }

  // Crear usuario
  static async singUp(user) {
    const response = await Api.post('/auth/register', user);
    return !!response.data.account;
  }

  // Recuperar Contraseña
  static async restorePass(user) {
    const response = await Api.post('/recover_password', user);
    return response;
  }

  // Registrar la información Personal del Usuario
  static async registerUserInfo(info){
    const response = await Api.post('/user/', info)
    return response;
  }

  // Registrar la información Educativa del Usuario.
  static async registerUserEducation(education){
    const response = await Api.post('/education/', education);
    return response;
  }

  // Registrar la información de Trabajo del Usuario
  static async registerUserWithExperience(info){
    const response = await Api.post('/job/', info)
    return response;
  }

  // Registrar la información de Trabajo del Usuario
  static async registerUserWithoutExperience(info){
    const response = await Api.post('/job_without', info)
    return response;
  }
}
