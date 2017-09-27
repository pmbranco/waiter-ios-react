import Immutable from 'immutable';

const defaultState = new Immutable.fromJS({
    user: {},
    pastWaits: [],
    passwordChangeStatus: 0
});

function user_reducer (state = defaultState, action) {
  let nextState;
  switch (action.type) {

    case 'PASSWORD_UPDATE_SUCCESS':
        nextState = state.set("passwordChangeStatus", 1);
        return nextState;

    case 'PASSWORD_UPDATE_FAILURE':
        nextState = state.set("passwordChangeStatus", 2);
        return nextState;

    case 'PROFILE_UPDATE_SUCCESS':
        let oldUser = state.get('user');
        oldUser.firstName = action.info.firstName;
        oldUser.lastName = action.info.lastName;
        oldUser.email = action.info.email;

        return state.set("user", oldUser);

    case 'PROFILE_UPDATE_FAILURE':
        return state;

    case 'GET_USER_SUCCESS':
        nextState = state.set('user', action.data.data.user);
        return nextState;

    case 'GET_USER_FAILURE':
        return state;

    case 'GET_PAST_WAITS_SUCCESS':
        nextState = state.set('pastWaits', action.data.data.wait)
        return nextState;

    case 'GET_PAST_WAITS_FAILURE':
      return state;

    default:
        return state;
  }
}

export default user_reducer;
