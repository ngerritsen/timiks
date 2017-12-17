import { SAVE_TIMES } from '../constants';
import { loadGroups } from '../actions';
import * as groupRepository from '../repositories/groupRepository';

const storeActions = [SAVE_TIMES];

const groupMiddleware = store => next => {
  const groups = groupRepository.getAll();

  if (groups) {
    store.dispatch(loadGroups(groups));
  }

  return action => {
    const result = next(action);

    if (storeActions.includes(action.type)) {
      groupRepository.store(store.getState().times.groups);
    }

    return result;
  }
};

export default groupMiddleware;
