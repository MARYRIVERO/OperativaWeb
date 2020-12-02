// importando Key y reducer's
import { SET_USER_LOADING, reducer as loadingReducer } from './actions/set-loading-user';
import { SET_USER_ERROR, reducer as errorReducer } from './actions/set-error-user';
import { SET_USER_INFO, reducer as userInfoReducer } from './actions/set-user-info';
import { SIGN_IN, reducer as signInReducer } from './actions/sign-in';
import { SIGN_UP, reducer as signUpReducer } from './actions/sign-up';
import { LOGOUT, reducer as logoutReducer } from './actions/logout';
import { SET_INIT_USER, reducer as initUserReducer } from './actions/init-user';
import { SET_JOB, reducer as setJobReducer } from './actions/set-job';
import { REMOVE_JOB, reducer as removeJobReducer } from './actions/remove-job';
import { UPDATE_JOB, reducer as updateJobReducer } from './actions/update-job';

// exportamos nuestras acciones
export { setUserLoading } from './actions/set-loading-user';
export { setUserError } from './actions/set-error-user';
export { setUserInfo } from './actions/set-user-info';
export { setSignInUser, signIn } from './actions/sign-in';
export { setSignUpUser, signUp } from './actions/sign-up';

const initialState = {
  currentUser: {
    account_id: null,
    address:null,
    first_name: null,
    last_name: null,
    gender: null,
    document_id: null,
    num_doc: null,
    birth_date: null,
    phone: null,
    country_id: 1,
    department_id: null,
    province_id: null,
    district_id: null,
    civil_id: null,
    provider_id: null,
    jobs: []
  },
  loading: false,
  error: null,
  signIn: false,
  signUp: false
};

const actionHandlers = {
  [SET_USER_LOADING]: loadingReducer,
  [SET_USER_ERROR]: errorReducer,
  [SET_USER_INFO]: userInfoReducer,
  [SIGN_IN]: signInReducer,
  [SIGN_UP]: signUpReducer,
  [LOGOUT]: logoutReducer,
  [SET_INIT_USER]: initUserReducer,
  [SET_JOB]: setJobReducer,
  [REMOVE_JOB]: removeJobReducer,
  [UPDATE_JOB]: updateJobReducer,
};

export default function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
