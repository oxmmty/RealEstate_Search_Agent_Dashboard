import { combineReducers } from '@reduxjs/toolkit';

import homepageReducer from '@/pages/home/store/reducer';

import globalReducer from './global.store';
import tagsViewReducer from './tags-view.store';
import userReducer from './user.store';

const rootReducer = combineReducers({
  user: userReducer,
  tagsView: tagsViewReducer,
  global: globalReducer,
  homepage: homepageReducer
});

export default rootReducer;
