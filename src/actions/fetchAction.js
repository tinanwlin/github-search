import store from '../store';

export const fetchUser = () => {
  return {
    type: 'FETCH_USER'
  };
};

export const fetchedUser = (post) => {
  return {
    type: 'FETCHED_USER',
    data: post
  };
};

export const receiveError = () => {
  return {
    type: 'RECEIVE_ERROR'
  };
};

export const thunkActionCreator = (username) => {
  const user = username.replace(/\s/g, "");
  store.dispatch(fetchUser());
  return (dispatch, getState) => {
    return fetch(`https://api.github.com/users/${user}`)
      .then(data => data.json())
      .then(data => {
        if (data.message === "Not Found") {
          throw new Error("No such user found!");
        } else {
          dispatch(fetchedUser(data));
        }
      }).catch(err => dispatch(receiveError()));
  };
};