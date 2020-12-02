import UserService from '../../../services/user.service';
import { setUserError } from './set-error-user';

export const SIGN_UP = 'User/SIGN_UP';

export const setSignUpUser = (user) => ({
  type: SIGN_UP,
  payload: user
});

// Accion de Thunk
export const signUp = (user) => {
  return async (dispatch) => {
    try {
      // dispatch llama a las acciones
      const response = await UserService.singUp(user);
      dispatch(setSignUpUser(response));
      dispatch(setUserError(null));
    } catch (error) {
      if(!error.response){
        dispatch(setUserError("Ha ocurrido un error interno."));
      } else {
        if(error.response.status === 401){
        dispatch(setUserError(error.response.data.message));
        } else if (error.response.status === 409){
          dispatch(setUserError("La cuenta ya existe. Por favor Iniciar sesión."));
        } else {
          dispatch(setUserError("Ha ocurrido un error interno."));
        };
      }
    }
  };
};

export const reducer = (state, action) => ({
  ...state,
  signUp: action.payload
});
