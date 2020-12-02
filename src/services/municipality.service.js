import Api from '../axios';

export default class MunicipalityService {

// Registrar la Solicitud de Empresa
  static async registerMunicipality(info){
    const response = await Api.post('/register/muni', info)
    return response;
  }
}