export const REMOVE_JOB = 'User/REMOVE_JOB';

export const removeJob = (job) => ({
  type: REMOVE_JOB,
  payload: job
});

export const reducer = (state, action) => {
    let current_user_jobs = state.currentUser;
    current_user_jobs.jobs.splice(action.payload,1);
    return {
        ...state,
        currentUser: { ...state.currentUser, ...current_user_jobs }
      }
};