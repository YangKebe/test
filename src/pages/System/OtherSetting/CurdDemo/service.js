import request from '/utils/request';
import globalData from '/project.config';
import pageConfig from './config.json';
const pageTag = pageConfig.pageTag;

export async function queryRecords(whereStr) {
    return request(globalData.mockUrl + `/${pageTag}/query`, {
        method: 'GET',
        body: whereStr,
    });
}