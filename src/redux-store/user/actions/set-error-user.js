export const SET_USER_ERROR = 'User/SET_USER_ERROR';

export const setUserError = (error) => ({
  type: SET_USER_ERROR,
  payload: error
});

export const reducer = (state, action) => ({
  ...state,
  error: action.payload
});
