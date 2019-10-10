import {
    Breadcrumb,
    Form,
    DatePicker,
    Card,
    Button,
    Divider,
    Input,
    message,
} from 'antd';

import React, { Component, Fragment } from 'react';

const FormItem = Form.Item;

class ProgramNew extends Component {
    handleSubmit = () => {
        message.success('添加成功');
        this.props.history.push('/');
     }

    render() { 
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 7,
                },
            },
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 12,
                },
                md: {
                    span: 3,
                },
            },
        };
        const config = {
            rules: [{ type: 'object', required: true, message: '请输入' }],
        };

        return (
            <Fragment>
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>危大项目管理</Breadcrumb.Item>
                    <Breadcrumb.Item>专项方案制定计划</Breadcrumb.Item>
                </Breadcrumb>
                <Divider/>
                <Card
                    bordered={false}
                    title="西昌大桥水库灌区二期"
                >
                    <div>
                        <Button
                            onClick={() => this.props.history.goBack()}
                            type="link"
                            value="large"
                        >
                            {'<< 返回'}
                        </Button>
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="方案编制负责人："
                        >
                            {getFieldDecorator('leader', config)(<Input />)}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="编制开始日期："
                        >
                            {getFieldDecorator('date-picker', config)(<DatePicker />)}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="编制结束日期："
                        >
                            {getFieldDecorator('date-picker', config)(<DatePicker />)}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="内部审批截止日期："
                        >
                            {getFieldDecorator('date-picker', config)(<DatePicker />)}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="专家评审截止日期："
                        >
                            {getFieldDecorator('date-picker', config)(<DatePicker />)}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="监理审批截止日期："
                        >
                            {getFieldDecorator('date-picker', config)(<DatePicker />)}
                        </FormItem>
                        <Form.Item
                            wrapperCol={{
                                xs: { span: 24, offset: 0 },
                                sm: { span: 16, offset: 8 },
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Fragment>
        );
    }
}
 
export default Form.create()(ProgramNew);