export const SET_JOB = 'User/SET_JOB';

export const setJob = (job) => ({
  type: SET_JOB,
  payload: job
});

export const reducer = (state, action) => {

  let currentUserJobs = state.currentUser;
  currentUserJobs.jobs.push(action.payload);

  return {
    ...state,
    currentUser: {...state.currentUserm, ...currentUserJobs}
  }
};