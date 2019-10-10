import {
	Card,
	Breadcrumb,
	Divider,
	Table,
	Button,
} from 'antd';
import React, { Component, Fragment } from 'react'
import './style.css';

class ProgramDetail extends Component {
	state = {
		dataSource: {},
		details: [],
	}

	columns = [
		{
			title: '名称',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '时间',
			dataIndex: 'date',
			key: 'date',
		},
		{
			title: '资料',
			dataIndex: 'content',
			key: 'content',
		}
	];


	render() {
		return (
			<Fragment>
				<Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>危大项目管理</Breadcrumb.Item>
                    <Breadcrumb.Item>专项方案详情</Breadcrumb.Item>
                </Breadcrumb>
                <Divider/>
				<div>
					<Button
						onClick={() => this.props.history.goBack()}
						type="link"
						value="large"
					>
						{'<< 返回'}
					</Button>
				</div>
				<Card
					bordered={false}
					title="西昌大桥水库灌区二期"
				>
					<Table
						rowKey={record => record.id}
						columns={this.columns}
						dataSource={this.state.details}
						pagination={false}
					/>
				</Card>
			</Fragment>
		);
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		this.setState({
			dataSource: {
				id: 20,
				projectId: 20,
			},
			details: [
				{
					id: 1,
					name: '开始编制',
					date: '2019-09-28',
					content: '无'
				},
				{
					id: 2,
					name: '编制完成',
					date: '2019-10-15',
					content: '方案.doc'
				},
				{
					id: 3,
					name: '内部审批',
					date: '2019-10-20',
					content: '审批意见.pdf'
				},
				{
					id: 4,
					name: '专家评审',
					date: '2019-11-01',
					content: '评审报告.pdf'
				},
				{
					id: 5,
					name: '监理审批',
					date: '2019-11-10',
					content: '评批意见.pdf'
				},
			]
		})
	}

}

export default ProgramDetail;