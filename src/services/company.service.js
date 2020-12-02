import Api from '../axios';

export default class CompanyService {

// Registrar la Solicitud de Empresa
  static async registerCompany(info){
    const response = await Api.post('/register/business', info)
    return response;
  }

}