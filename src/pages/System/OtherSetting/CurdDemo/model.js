import {queryRecords} from './service';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import globalData from "/project.config";
import pageConfig from './config.json';
const pageTag = pageConfig.pageTag;

export default {
  namespace: pageTag,
  state: {

  },
  reducers: {
    'setList'(state, { payload }) {
      state.dataList = payload.data.records;
      return {...state};
    },
  },
  effects: {
    *queryByWhere({ payload }, { call, put }) {
      const res = yield call(queryRecords, payload);
      if (res.data) {
        yield put({
          type: 'setList',
          payload: {
            data: res.data,
            whereStr: payload
          }
        });
      }
    },
  },
  subscriptions: {
  },
  
};
