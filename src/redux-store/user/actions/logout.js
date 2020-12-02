export const LOGOUT = 'User/LOGOUT';

export const logout = () => ({
  type: LOGOUT,
});

export const reducer = (state, action) => ({
  ...state,
  currentUser: null
});
