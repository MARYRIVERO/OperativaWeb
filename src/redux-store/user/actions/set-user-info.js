export const SET_USER_INFO = 'User/SET_USER_INFO';

export const setUserInfo = (currentUser) => ({
  type: SET_USER_INFO,
  payload: currentUser
});

export const reducer = (state, action) => ({
  ...state,
  currentUser: { ...state.currentUser, ...action.payload }
});