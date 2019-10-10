import {
    Form,
    Breadcrumb,
    Button,
    Divider,
} from 'antd';
import React, { Component, Fragment } from 'react';
import ProjectForm from '../Shared/ProjectForm';

class ProjectNew extends Component {
    handleSubmit = () => {
        this.props.history.push('/');
    }

    render() { 
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
                />
            </Fragment>
         );
    }
}
 
export default Form.create()(ProjectNew);