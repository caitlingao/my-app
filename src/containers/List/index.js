import {
    Breadcrumb,
    Card,
    Table,
    Form,
    Row,
    Col,
    Select,
    Button,
    Input,
    Popconfirm,
    Divider,
    Modal,
    Badge,
} from 'antd';
import React, { Component, Fragment } from 'react';

import './style.css';

const FormItem = Form.Item;
const { Option } = Select;

const statusMap = ['default', 'processing', 'success', 'error'];
const isDangerHash = { 0: '超危', 1: '否' };
const constructionStatusHash = { 0: '未开工', 1: '施工中' };
const programStatusHash = { 0: '未编制', 1: '已审批' };

class DangerProjectList extends Component {
    state = {
        dataSource: [],
        constructionModalVisible: false,
        programModalVisible: false,
        recordValues: {},
    }

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '项目名称',
            dataIndex: 'projectName',
            key: 'projectName',
        },
        {
            title: '危大工程名称',
            dataIndex: 'dangerProgramName',
            key: 'dangerProgramName',
        },
        {
            title: '实施部位',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: '是否高危',
            dataIndex: 'isDanger',
            key: 'isDanger',
            render: val => <Badge status={statusMap[val]} text={isDangerHash[val]} />
        },
        {
            title: '计划开工日期',
            dataIndex: 'startedAt',
            key: 'startedAt',
        },
        {
            title: '施工状态',
            dataIndex: 'constructionStatus',
            key: 'constructionStatus',
            render: val => <Badge status={statusMap[val]} text={constructionStatusHash[val]} />
        },
        {
            title: '专项方案状态',
            dataIndex: 'programStatus',
            key: 'programStatus',
            render: val => <Badge status={statusMap[val]} text={programStatusHash[val]} />
        },
        {
            title: '操作',
            width: '10%',
            render: (text, record) =>
                <Fragment>
                    <Button type="link" onClick={() => this.handleActions('newProgram', record)}>专项方案制定</Button>
                    <Button type="link" onClick={() => this.handleActions('constructionStatus', record)}>施工状态更新</Button>
                    <Button type="link" onClick={() => this.handleActions('programStatus', record)}>专项方案状态更新</Button>
                    <Button type="link" onClick={() => this.handleActions('programDetail', record)}>专项方案详情</Button>
                    <Button type="link" onClick={() => this.handleActions('edit', record)}>编辑</Button>
                    <Popconfirm title="确认要删除此条内容？" onConfirm={() => this.handleActions('delete', record)}>
                    <Button type="link">删除</Button>
                    </Popconfirm>
                </Fragment>
        },
    ];

    componentDidMount = () => {
        let dataSource = [];
        for (let i = 20; i >=1; i--) {
            dataSource.push({
                id: i,
                projectName: `西昌大桥水库灌区二期 ${i}`,
                dangerProgramName: `深基坑支护 ${i}`,
                position: `${i}#深基坑`,
                isDanger: i % 2 === 0 ? 0 : 1,
                startedAt: '2019-10-11',
                constructionStatus: i % 3 === 0 ? 0 : 1,
                programStatus: i % 2 === 0 ? 0 : 1,
            });
        }

        this.setState({ dataSource: dataSource });

    }

    deleteItem = (id) => {
        this.setState({ dataSource: this.state.dataSource.filter(item => item.id !== id) });
    }

    handleActions = (action, record) => {
        switch (action) {
            case 'newProgram':
                this.props.history.push('program/new');
                break;
            case 'constructionStatus':
                this.handleConstructionModalVisible(true, record);
                break;
            case 'programStatus':
                this.handleProgramModalVisible(true, record);
                break;
            case 'programDetail':
                this.props.history.push(`program/${record.id}`);
                break;
            case 'edit':
                this.props.history.push(`project/${record.id}/edit`);
                break;
            case 'delete':
                this.deleteItem(record.id);
                break;
            default:
                break;
        }
    }

    handleSearch = (e) => {
        e.preventDefault();
        const { form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
        });
    }

    handleFormReset = () => {
        this.props.form.resetFields();
    }

    handleConstructionModalVisible = (flag, record) => {
        this.setState({
            constructionModalVisible: !!flag,
            recordValues: record || {},
        })
    }
    handleConstructionStatusModalOk = () => {
        this.setState({ constructionModalVisible: false });
        const { form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;

            this.state.dataSource.forEach(data => {
                if (data.id === fieldsValue.id) data.constructionStatus = 1;
                });
        });
    }

    handleConstructionStatusModalCancel = () => {
        this.setState({ constructionModalVisible: false });
    }

    handleProgramModalVisible = (flag, record) => {
        this.setState({
            programModalVisible: !!flag,
            recordValues: record || {},
        })
    }
    handleProgramStatusModalOk = () => {
        this.setState({ programModalVisible: false });
        const { form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;

            this.state.dataSource.forEach(data => {
                if (data.id === fieldsValue.id) data.programStatus = 1;
                });
        });
    }

    handleProgramStatusModalCancel = () => {
        this.setState({ programModalVisible: false });
    }

	render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const { recordValues } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 5,
                },
            },
            wrapperCol: {
                xs: {
                    span: 15,
                },
            }
        };
        return (
            <Fragment>
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>危大项目管理</Breadcrumb.Item>
                </Breadcrumb>
                <Divider/>
                <Card
                    className="dnager-program-body"
                    bordered={false}
                >
                    <div>
                        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                            <Row gutter={24} >
                                <Col md={8} sm={24} span={8} style={{ display: 'block'}}>
                                    <FormItem label="项目名称">
                                        {getFieldDecorator('projectName')(<Input placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24} span={8} style={{ display: 'block'}}>
                                    <FormItem label="危大工程名称">
                                        {getFieldDecorator('dangerProgramName')(<Input placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24} span={8} style={{ display: 'block'}}>
                                    <FormItem label="是否高危">
                                        {getFieldDecorator('isDanger')(
                                            <Select
                                                placeholder="请选择"
                                                style={{
                                                    width: '100%',
                                                }}
                                            >
                                                {
                                                    Object.keys(isDangerHash).map(key => (
                                                        <Option
                                                            key={key}
                                                            value={key}
                                                        >
                                                            {isDangerHash[key]}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>,
                                        )}
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24} span={8} style={{ display: 'block'}}>
                                    <FormItem label="施工状态">
                                        {getFieldDecorator('constructionStatus')(
                                            <Select
                                                placeholder="请选择"
                                                style={{
                                                    width: '100%',
                                                }}
                                            >
                                                {
                                                    Object.keys(constructionStatusHash).map(key => (
                                                        <Option
                                                            key={key}
                                                            value={key}
                                                        >
                                                            {constructionStatusHash[key]}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>,
                                        )}
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24} span={8} style={{ display: 'block'}}>
                                    <FormItem label="专项方案状态">
                                        {getFieldDecorator('programStatus')(
                                            <Select
                                                placeholder="请选择"
                                                style={{
                                                    width: '100%',
                                                }}
                                            >
                                                {
                                                    Object.keys(programStatusHash).map(key => (
                                                        <Option
                                                            key={key}
                                                            value={key}
                                                        >
                                                            {programStatusHash[key]}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>,
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit">
                                    查询
                                    </Button>
                                    <Button
                                        style={{ marginLeft: 8 }}
                                        onClick={this.handleFormReset}
                                    >
                                    重置
                                    </Button>
                                </Col>

                            </Row>
                        </Form>
                        <div
                            style={{
                                marginTop: 40,
                                marginBottom: 20,
                            }}
                        >
                            <Button
                                type="primary"
                                onClick={() => this.props.history.push('/project/new')}
                            >
                                识别
                            </Button>
                            <Button
                                type="primary"
                                style={{ marginLeft: 20 }}
                            >
                                导出
                            </Button>
                        </div>
                        <Table
                            rowKey={record => record.id}
                            columns={this.columns}
                            dataSource={this.state.dataSource}
                        />
                    </div>
                </Card>
                <Modal
                    destroyOnClose
                    title="施工状态更新"
                    visible={this.state.constructionModalVisible}
                    onOk={this.handleConstructionStatusModalOk}
                    onCancel={this.handleConstructionStatusModalCancel}
                >
                    <FormItem
                        {...formItemLayout}
                        label="施工状态"
                    >
                        {form.getFieldDecorator('constructionStatus', {
                            initialValue: constructionStatusHash[1],
                            })(<Input placeholder="请输入" />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="id"
                        style={{ display: 'none' }}
                    >
                        {form.getFieldDecorator('id', {
                            initialValue: recordValues.id,
                            })(<Input />)}
                    </FormItem>
                </Modal>
                <Modal
                    destroyOnClose
                    title="专项方案状态更新"
                    visible={this.state.programModalVisible}
                    onOk={this.handleProgramStatusModalOk}
                    onCancel={this.handleProgramStatusModalCancel}
                >
                    <FormItem
                        {...formItemLayout}
                        label="施工状态"
                    >
                        {form.getFieldDecorator('constructionStatus', {
                            initialValue: programStatusHash[1],
                            })(<Input placeholder="请输入" />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="id"
                        style={{ display: 'none' }}
                    >
                        {form.getFieldDecorator('id', {
                            initialValue: recordValues.id,
                            })(<Input />)}
                    </FormItem>
                </Modal>
            </Fragment>
        );
    }
}

export default Form.create()(DangerProjectList);
