import Api from '../axios';

export default class UtilService {

 // Servicio que obtiene la lista de tipo de documento
  static async listDocument() {
    const response = await Api.get('/documents');
    return response.data;
 } 

// Servicio que obtiene la lista de tipo de estado civil
  static async listCivil() {
    const response = await Api.get('/civils');
    return response.data;
 } 

// Servicio que obtiene la lista de Departamentos
  static async listDepartment() {
    const response = await Api.get('/departments');
    return response.data;
 } 

 // Servicio que obtiene la lista de Provincias
 static async listProvince() {
    const response = await Api.get('/provinces');
    return response.data;
 } 

// Servicio que obtiene la lista de Distrito
 static async listDistrict() {
    const response = await Api.get('/districts');
    return response.data;
 } 

 // Servicio que obtiene la lista de nivel academico
  static async listLevel() {
    const response = await Api.get('/levels');
    return response.data;
 } 

 // Servicio que obtiene la lista especilidad
  static async listField() {
    const response = await Api.get('/fields');
    return response.data;
 } 

// Servicio que obtiene la lista de genero
  static async listGender() {
    const response = await Api.get('/gender/');
    return response.data;
 } 

// Servicio que obtiene la lista de proveedores
  static async listProvider() {
    const response = await Api.get('/providers');
    return response.data;
 } 

// Servicio que obtiene la lista de nivel de trabajos
  static async listJobLevel() {
    const response = await Api.get('/job_levels');
    return response.data;
 } 

 // Servicio que obtiene la lista de roles de trabajo
  static async listJobRole() {
    const response = await Api.get('/job_roles');
    return response.data;
 } 

// Servicio que obtiene la lista de rubros
  static async listRubro() {
    const response = await Api.get('/areas');
    return response.data;
 } 

// Servicio que obtiene la lista de motivos de retiro
  static async listMotivoRetiro() {
    const response = await Api.get('/attritions');
    return response.data;
 } 

}