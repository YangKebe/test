import { queryRecords, deleteRecord, submitNew, modifyRecord } from './service';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import globalData from "/project.config";
import colConfig from './config.json';


export default {
  namespace: colConfig.pageTag,
  state: {
    pageSize: globalData.pageSize,
    curTableList: [],
    curDetail: {},
    curQuryStr: {},
    totalNum: 0,
  },
  reducers: {
    'setList'(state, { payload }) {
      state.curTableList = payload.data.resultList;
      state.totalNum = payload.data.totalRecord;
      state.curQuryStr = payload.whereCond;
      return JSON.parse(JSON.stringify(state));
    },
    'setDetail'(state, { payload }) {
      state.curDetail = payload.detailData;
      return JSON.parse(JSON.stringify(state));
    },
    'addSuccess'(state, { payload: data }) {
      if (data.retCode.status === '0000' || data.retCode.status === '1111') {
        message.success("添加成功", 1);
      } else {
        message.error(data.msg);
      }
      return JSON.parse(JSON.stringify(state));
    },
    'clearTableData'(state, { payload: data }) {
      state.curTableList = [];
      return { ...state };
    }
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

    *nextPage({ payload }, { select, call, put }) {
      const curQuryParam = yield select(state => state[colConfig.pageTag].curQuryStr);
      const res = yield call(queryRecords, { ...curQuryParam, ...payload });
      if (res.data) {
        yield put({
          type: 'setList',
          payload: {
            data: res.data,
            whereCond: { ...curQuryParam, ...payload }
          }
        })
      }
    },

    *deleteRecord({ payload }, { call, put }) {
      const res = yield call(deleteRecord, payload);
      if (res.retCode.status === '0000') {
        message.success('删除成功', 1);
        yield put({
          type: 'nextPage',
          payload: {
            page: 1
          }
        })
      } else {
        message.error('删除失败', 1);
      }

    },
    *goToDetail({ payload }, { call, put }) {
      //这里可以补充获取详情信息的方法，当前页面传递的参数
      if (payload.detailType !== 'add') {
        const detailData = payload.record || {};
        yield put({
          type: 'setDetail',
          payload: {
            detailData,
          }
        });
      }
      yield put(routerRedux.push(
        {
          pathname: payload.pathname,
          state: {
            detailType: payload.detailType
          }
        }
      ));
    },
    *submitNew({ payload }, { call, put }) {
      const data = yield call(submitNew, payload.newValues);
      if (data.data.retCode.status === '0000') {
        message.success("添加成功", 1);
        yield put({ type: 'nextPage', payload: { data: {}, whereStr: null } })
      } else if (data.data.retCode.status === '9990') {
        message.error('添加失败，主键重复');
      } else {
        message.error("添加失败", 1);
      }
      yield put(routerRedux.push({
        pathname: payload.pathname,
        state: {}
      }));
    },
    *modifyRecord({ payload }, { call, put }) {
      const data = yield call(modifyRecord, payload.newValues);

      if (data.data.retCode.status === '0000') {
        message.success("修改成功", 1);
        yield put({ type: 'nextPage', payload: { data: {}, whereStr: null } })
      } else {
        message.error("修改失败", 1);
      }
      yield put(routerRedux.push({
        pathname: payload.pathname,
        state: {}
      }))
    },
  },
  subscriptions: {
  },
};
