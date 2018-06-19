import request from '/utils/request';
import globalData from '/project.config';
import tableConfig from './config.json';


export async function queryRecords(whereStr) {
    return request(globalData.mockUrl + `/${tableConfig.pageTag}/query`, {
        method: 'GET',
        body: whereStr,
    });
}

export async function deleteRecord(data) {
    return request(globalData.mockUrl + `/${tableConfig.pageTag}/delete`, {
        method: 'POST',
        body: data,
    });
}

export async function submitNew(values) {
    return request(globalData.baseUrl + `/v1/${tableConfig.pageTag}`, values, "POST");
}

export async function modifyRecord(values) {
    return request(globalData.baseUrl + `/v1/${tableConfig.pageTag}/upd`, values, "POST");
}