import {
    Form,
    Card,
    Button,
    Input,
    DatePicker,
    Select,
    Radio,
    message,
} from 'antd';
import React, { Component } from 'react';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

const categoryList = [
    {
        id: 1,
        title: '基坑工程',
    },
    {
        id: 2,
        title: '模板工程及支撑体系',
    },
    {
        id: 3,
        title: '起重吊装及起重机械安装拆卸工程',
    },
    {
        id: 4,
        title: '脚手架工程',
    },
    {
        id: 5,
        title: '拆除工程',
    },
    {
        id: 6,
        title: '暗挖工程',
    },
    {
        id: 7,
        title: '其它'
    }
];

class ProjectForm extends Component {
    state = {
        radioValue: 0,
        record: this.props.record,
    }

    componentDidMount = () => {
        const { record } = this.state;
        const { form } = this.props;
        Object.keys(form.getFieldsValue()).forEach(key => {
            let obj = {};
            if (key !== 'startedAt') {
                if (key === 'categoryId') {
                    obj[key] = categoryList.filter(gt => gt.id === record[key])[0].title;
                } else {
                    obj[key] = record[key] || null;
                }
            }
            form.setFieldsValue(obj);
        })
    }

    
    handleRadioChange = e => {
        this.setState({ radioValue: e.target.value });
    }


    handleSubmit = () => {
        const { onSubmit } = this.props;
        message.success('操作成功');
        onSubmit();
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
        }
        const dateFormat = 'YYYY-MM-DD';

        return ( 
            <Card
                bordered={false}
                title="西昌大桥水库灌区二期"
            >

                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="危大工程名称"
                    >
                        {getFieldDecorator('projectName', config)(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={"危大工程类别"}
                    >
                        {getFieldDecorator('categoryId', config)(
                            <Select
                                placeholder="请选择类别"
                            >
                                {categoryList.map(item => (
                                    <Option
                                        key={item.id}
                                        value={item.title}
                                    >
                                        {item.title}
                                    </Option>
                                    ))}
                            </Select>,
                        )}
                    </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="编制开始日期："
                        >
                            {getFieldDecorator('startedAt', config)(<DatePicker defaultValue={moment('2015-06-06', dateFormat)} />)}
                        </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="实施部位"
                    >
                        {getFieldDecorator('position', config)(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={"是否高危"}
                    >
                        {getFieldDecorator('isDanger', {
                            initialValue: 0,
                            rules: [
                                { required: true, }
                            ],
                        })(
                            <Radio.Group onChange={this.handleRadioChange} value={this.state.radioValue}>
                                <Radio value={0}>是</Radio>
                                <Radio value={1}>否</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 },
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </FormItem>
                </Form>
            </Card>
         );
    }
}
 
export default Form.create()(ProjectForm);