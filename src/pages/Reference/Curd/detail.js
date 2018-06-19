import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import OpenFormItemGroup from '/components/OpenFormItemGroup';
import MyBreadcrumb from '/components/MyBreadcrumb';
import globalData, { getSelectionsByPid, getDicNameById, getSelectionsTreeByPid, getTreePathByPid } from '/project.config';
import colConfig from './config.json';
import InputFromTree from '/components/InputFromTree'


// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;

class DetaiPage extends React.PureComponent {

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                let newValues = {};

                Object.keys(values).forEach(key => {
                    const config = colConfig.fieldInfo[key];
                    newValues[key] = values[key];
                    if (config.dataType === '日期') {
                        newValues[key] = values[key].format("YYYY-MM-DD");
                    }
                    else if (config.dataType === '时间') {
                        newValues[key] = values[key].format("YYYY-MM-DD HH:mm:ss");
                    }
                    else if (config.controlType === '下拉列表-级联') {
                        newValues[key] = values[key].length && values[key][values[key].length - 1] || 0;
                    }
                });

                newValues = {
                    ...this.props.curDetail,
                    ...newValues,
                    operator: globalData.userId,
                }

                if (this.props.location.state.type === 'modify') {
                    this.props.dispatch({
                        type: `${colConfig.pageTag}/modifyRecord`,
                        payload: {
                            newValues,
                            pathname: this.props.location.pathname,
                        }
                    });
                } else {
                    this.props.dispatch({
                        type: `${colConfig.pageTag}/submitNew`,
                        payload: {
                            newValues,
                            pathname: this.props.location.pathname,
                        }
                    });
                }
            }
        });
    }


    /**
     * 生成下拉选项
     * @param {*可以为带typeId和typeName属性的数组，也可以是,分隔的字符串} option 
     */
    GetOption(option, typeIsNumber = true) {
        let arr;
        if (!Array.isArray(option)) {
            arr = option.split(',').map(the => {
                const tempArr = the.split('|');
                return {
                    typeId: typeIsNumber ? Number(tempArr[0]) : tempArr[0],
                    typeName: tempArr.length > 0 ? tempArr[1] : tempArr[0],
                }
            });
        } else {
            arr = option;
        }
        return arr.map(
            optionValue => {
                const value = optionValue.typeId;
                const displayName = optionValue.typeName;
                return (<Select.Option value={value} key={Math.random()} style={{ height: '32px' }}>
                    {displayName}
                </Select.Option>)
            }
        );
    }


    onCheck = checkedKeys => this.setState({ checkedKeys });

    render() {
        const { getFieldDecorator } = this.props.form;

        return (

            <div>
                <MyBreadcrumb itemList={['企业信息管理', '项目详情']} >
                    <Button
                        key='btnAdd'
                        style={{ marginLeft: '5px' }}
                        type="primary"
                        icon="upload"
                        onClick={this.handleSubmit}>
                        提交</Button>
                </MyBreadcrumb>

                <Form>

                    <OpenFormItemGroup title='基本信息'>
                                            <FormItem key='enterpriseName' colSpans={1} label='企业名称'>
                                                {getFieldDecorator('enterpriseName', { initialValue: '', rules: [{ required: true,  max:64,  message: '请正确填写企业名称' }], })(
                                                    <Input id='enterpriseName' />
                                                )}
                                            </FormItem>
<FormItem key='enterpriseUscc' colSpans={1} label='统一信用代码'>
                                                {getFieldDecorator('enterpriseUscc', { initialValue: '', rules: [{ required: true,  max:64,  message: '请正确填写统一信用代码' }], })(
                                                    <Input id='enterpriseUscc' />
                                                )}
                                            </FormItem>
<FormItem key='hgCode' colSpans={1} label='海关编码'>
                                                {getFieldDecorator('hgCode', { initialValue: '', rules: [{ required: true,  max:64,  message: '请正确填写海关编码' }], })(
                                                    <Input id='hgCode' />
                                                )}
                                            </FormItem>
<FormItem key='enterpriseAddress' colSpans={2} label='公司地址'>
                                                {getFieldDecorator('enterpriseAddress', { initialValue: '', rules: [{ required: true,  max:255,  message: '请正确填写公司地址' }], })(
                                                    <Input id='enterpriseAddress' />
                                                )}
                                            </FormItem>
<FormItem key='enterpriseType' colSpans={1} label='企业类型'>
                                                {getFieldDecorator('enterpriseType', { initialValue: '118001', rules: [{ required: true,   type:'integer',  message: '请正确填写企业类型' }], })(
                                                    <Select id='enterpriseType'>
                                                        {this.GetOption(getSelectionsByPid(118))}
                                                    </Select>
                                                )}
                                            </FormItem>
<FormItem key='establishDate' colSpans={1} label='成立日期'>
                                                {getFieldDecorator('establishDate', { initialValue: moment('1700-01-01'), rules: [{ required: true,   type:'date',  message: '请正确填写成立日期' }], })(
                                                    <DatePicker id='establishDate' style={{ width: '100%' }} placeholder="请选择成立日期" />
                                                )}
                                            </FormItem>
<FormItem key='registCapital' colSpans={1} label='注册资本(万元）'>
                                                {getFieldDecorator('registCapital', { initialValue: '', rules: [{ required: true,   type:'number',  message: '请正确填写注册资本(万元）' }], })(
                                                    <Input id='registCapital' />
                                                )}
                                            </FormItem>
<FormItem key='legalName' colSpans={1} label='法人代表'>
                                                {getFieldDecorator('legalName', { initialValue: '', rules: [{ required: true,  max:255,  message: '请正确填写法人代表' }], })(
                                                    <Input id='legalName' />
                                                )}
                                            </FormItem>
<FormItem key='contactPhone' colSpans={1} label='法人联系方式'>
                                                {getFieldDecorator('contactPhone', { initialValue: '', rules: [{ required: true,  max:255,  message: '请正确填写法人联系方式' }], })(
                                                    <Input id='contactPhone' />
                                                )}
                                            </FormItem>
                                        </OpenFormItemGroup>
<OpenFormItemGroup title='详情信息'>
                                            
<FormItem key='parkType' colSpans={1} label='板块类别'>
                                                {getFieldDecorator('parkType', { initialValue: getTreePathByPid('111001001'), rules: [{ required: true,   type:'integer',  message: '请正确填写板块类别' }], })(
                                                    <InputFromTree
                                                        treeData={getSelectionsTreeByPid(111)}
                                                        onSelectTreeNode={(value) => this.props.form.setFieldsValue({
                                                            parkType: value,
                                                        })}
                                                        id='parkType'
                                                        readOnly="readonly" />
                                                )}
                                            </FormItem>
<FormItem key='workshopPos' colSpans={2} label='厂房位置'>
                                                {getFieldDecorator('workshopPos', { initialValue: '', rules: [{ required: true,  max:255,  message: '请正确填写厂房位置' }], })(
                                                    <Input id='workshopPos' />
                                                )}
                                            </FormItem>

<FormItem key='trialTime' colSpans={1} label='试产时间'>
                                                {getFieldDecorator('trialTime', {  rules: [{ required: true,   type:'date',  message: '请正确填写试产时间' }], })(
                                                    <DatePicker id='trialTime' style={{ width: '100%' }} placeholder="请选择试产时间" />
                                                )}
                                            </FormItem>
<FormItem key='investTime' colSpans={1} label='投产时间'>
                                                {getFieldDecorator('investTime', {  rules: [{ required: true,   type:'date',  message: '请正确填写投产时间' }], })(
                                                    <DatePicker id='investTime' style={{ width: '100%' }} placeholder="请选择投产时间" />
                                                )}
                                            </FormItem>
<FormItem key='productTime' colSpans={1} label='达产时间'>
                                                {getFieldDecorator('productTime', {  rules: [{ required: true,   type:'date',  message: '请正确填写达产时间' }], })(
                                                    <DatePicker id='productTime' style={{ width: '100%' }} placeholder="请选择达产时间" />
                                                )}
                                            </FormItem>
<FormItem key='busiInfo' colSpans={1} label='实际经营情况'>
                                                {getFieldDecorator('busiInfo', { initialValue: '121001', rules: [{ required: true,   type:'integer',  message: '请正确填写实际经营情况' }], })(
                                                    <Input id='busiInfo' />
                                                )}
                                            </FormItem>
<FormItem key='workshopArea' colSpans={1} label='厂房面积(平方米)'>
                                                {getFieldDecorator('workshopArea', { initialValue: '100.12 ', rules: [{ required: true,   type:'number',  message: '请正确填写厂房面积(平方米)' }], })(
                                                    <Input id='workshopArea' />
                                                )}
                                            </FormItem>
<FormItem key='isInvest' colSpans={1} label='是否系招商引资'>
                                                {getFieldDecorator('isInvest', { initialValue: '', rules: [{ required: true,    message: '请正确填写是否系招商引资' }], })(
                                                    <Select id='isInvest'>
                                                        {this.GetOption('|,1|是,0|否')}
                                                    </Select>
                                                )}
                                            </FormItem>
<FormItem key='enterpriseScope' colSpans={3} label='经营范围'>
                                                {getFieldDecorator('enterpriseScope', { initialValue: '', rules: [{ required: true,  max:1024,  message: '请正确填写经营范围' }], })(
                                                    <Input.TextArea rows={4} />
                                                )}
                                            </FormItem>
<FormItem key='remark' colSpans={3} label='备注'>
                                                {getFieldDecorator('remark', { initialValue: '', rules: [{ required: true,  max:1024,  message: '请正确填写备注' }], })(
                                                    <Input.TextArea rows={4} />
                                                )}
                                            </FormItem>
                                        </OpenFormItemGroup>

                </Form>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        curDetail: state[colConfig.pageTag].curDetail,
    };
}

const WrappedDetailPage = Form.create({

    mapPropsToFields: props => {
        if (props.location.state && props.location.state.detailType !== 'add') { //新增的时候不进行数据链接
            let obj = {};
            for (let key in props.curDetail) {
                const config = colConfig.fieldInfo[key];
                if (!config) continue;
                if (config.dataType === '日期' || config.dataType === '时间') {
                    obj[key] = Form.createFormField({
                        key,
                        value: moment(props.curDetail[key])
                    })
                }
                else if (config.controlType === '下拉列表-级联') {
                    obj[key] = Form.createFormField({
                        key,
                        value: getTreePathByPid(props.curDetail[key])
                    })
                }
                else {
                    obj[key] = Form.createFormField({
                        key,
                        value: props.curDetail[key]
                    })
                }

            }

            return obj;
        }
    }
})(DetaiPage);

export default connect(mapStateToProps)(WrappedDetailPage);
