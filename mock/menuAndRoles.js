import qs from 'qs';
import menuData from './menuConfig.json';

const myExport = {

    'POST /api/v1/Auth/setRoleMenus'(req, res) {
        setTimeout(() =>
            res.json({
                "retCode": { "status": "0000" },
                "data": '设置成功',
            }));
    },

    'GET /api/v1/Auth/queryRecords'(req, res) {

        let testData = [
            { roleId: '0', pRoleId: '-1', roleName: '管理员角色组', remark: '管理员角色组', operator: 'admin', operateTime: 32000 },
            { roleId: '0-1', pRoleId: '0', roleName: '系统管理员', remark: '系统管理员', operator: 'admin', operateTime: 32000 },
            { roleId: '0-2', pRoleId: '0', roleName: '部门管理员', remark: '部门管理员', operator: 'admin', operateTime: 32000 },
            { roleId: '1', pRoleId: '-1', roleName: '项目经理组', remark: '项目经理组', operator: 'admin', operateTime: 32000 },
            { roleId: '1-1', pRoleId: '1', roleName: '项目经理', remark: '项目经理', operator: 'admin', operateTime: 32000 },
            { roleId: '1-2', pRoleId: '1', roleName: '技术经理', remark: '技术经理', operator: 'admin', operateTime: 32000 },
            { roleId: '2', pRoleId: '-1', roleName: '设计人员', remark: '设计人员', operator: 'admin', operateTime: 32000 },
            { roleId: '2-1', pRoleId: '2', roleName: '查勘人员', remark: '查勘人员', operator: 'admin', operateTime: 32000 },
            { roleId: '2-2', pRoleId: '2', roleName: '绘图人员', remark: '绘图人员', operator: 'admin', operateTime: 32000 },
        ];

        setTimeout(() =>
            res.json({
                "retCode": { "status": "0000" },
                "data": {
                    resultList: testData,
                    totalRecord: 100
                },
            }));
    },
    'POST /api/v1/Auth/del'(req, res) {

        setTimeout(() =>
            res.json({
                "retCode": { "status": "0000" },
                "data": ''
            }));
    },

    'GET /api/v1/Auth/getMenuKeysByRoleId'(req, res) {
        setTimeout(() =>
            res.json({
                "retCode": { "status": "0000" },
                "data": ['0', '0-1'],
            }));
    },

    'GET /api/v1/menus/userMenusInfo'(req, res) {

        // let newData = [...tableListDataForMenu];

        setTimeout(() => {
            res.json({
                "retCode": {
                    "status": "0000"
                },
                "data": menuData || []
            });
        }, 200);
    }
}

export default myExport;
