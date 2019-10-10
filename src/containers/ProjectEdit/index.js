import {
    Form,
    Breadcrumb,
    Button,
    Divider
} from 'antd';
import React, { Component, Fragment } from 'react';
import ProjectForm from '../Shared/ProjectForm';

class ProjectEdit extends Component {
    handleSubmit = () => {
        this.props.history.push('/');
    }
    render() { 
        const record = {
            id: 20,
            projectName: '西昌大桥水库灌区二期',
            categoryId: 2,
            position: '1#深基坑',
            isDanger: 0,
            startedAt: '2019-10-11',
            constructionStatus: 1,
            programStatus: 1,
        }
        return ( 
            <Fragment>
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>危大项目管理</Breadcrumb.Item>
                    <Breadcrumb.Item>识别</Breadcrumb.Item>
                </Breadcrumb>
                <Divider />
                <div>
                    <Button
                        onClick={() => this.props.history.push('/')}
                        type="link"
                        value="large"
                    >
                        {'<< 返回'}
                    </Button>
                </div>
                <ProjectForm
                    onSubmit={this.handleSubmit}
                    record={record}
                />
            </Fragment> 
         );
    }
}
 
export default Form.create()(ProjectEdit);