export const UPDATE_JOB = 'User/UPDATE_JOB';

export const updateJob = (job) => ({
  type: UPDATE_JOB,
  payload: job
});

export const reducer = (state, action) => {

  let currentUserJobs = state.currentUser;
  currentUserJobs.jobs[action.payload['indice']] = action.payload['job'];
  return {
    ...state,
    currentUser: {...state.currentUserm, ...currentUserJobs}
  }
};