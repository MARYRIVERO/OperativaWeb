export const SET_INIT_USER = 'User/SET_INIT_USER';

export const setInitUser = () => ({
  type: SET_INIT_USER,
  payload: {
    id_account: null,
    first_name: null,
    last_name: null,
    gender: null,
    type_doc: 1,
    num_doc: null,
    birth_date: null,
    address: null,
    phone: null,
    id_country: null,
    id_state: null,
    id_city: null,
    id_civil_status: null,
    id_provider: 1,
    jobs: []
  }
});

export const reducer = (state, action) => ({
  ...state,
  currentUser: { ...state.currentUser, ...action.payload }
});