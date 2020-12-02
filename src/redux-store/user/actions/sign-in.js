import UserService from '../../../services/user.service';
import { setUserLoading } from './set-loading-user';
import { setUserError } from './set-error-user';

export const SIGN_IN = 'User/SIGN_IN';

// Accion de Redux, aca vamos a enviar la informacion
// al reducer
export const setSignInUser = (user) => ({
  type: SIGN_IN,
  payload: user
});

// Accion de Thunk
export const signIn = (user) => {
  return async (dispatch) => {
    try {
      // dispatch llama a las acciones
      dispatch(setUserLoading(true));
      const response = await UserService.signIn(user);
      dispatch(setSignInUser(response));
      dispatch(setUserLoading(false));
      dispatch(setUserError(null));
    } catch (error) {
      dispatch(setUserLoading(false));
      if(!error.response){
        dispatch(setUserError("Ha ocurrido un error interno."));
      } else {
        if(error.response.status === 401){
        dispatch(setUserError("Usuario o contraseña Incorrecta."));
      } else {
        dispatch(setUserError("Ha ocurrido un error interno."));
      };
      }
    }
  };
};

// Aca vamos actualizar la informacion
// al store
export const reducer = (state, action) => ({
  ...state,
  signIn: action.payload
});
