export const SET_USER_LOADING = 'User/SET_USER_LOADING';

export const setUserLoading = (loading) => ({
  type: SET_USER_LOADING,
  payload: loading
});

export const reducer = (state, action) => ({
  ...state,
  loading: action.payload
});
