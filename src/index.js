import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Layout } from 'antd';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppHeader from './components/Header/';
import DangerProjectList from './containers/List/';
import ProgramNew from './containers/ProgramNew/';
import ProgramDetail from './containers/ProgramDetail/';
import ProjectNew from './containers/ProjectNew/';
import ProjectEdit from './containers/ProjectEdit/';
import 'antd/dist/antd.css';
import './style.css';

const { Header, Footer, Content } = Layout;

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Layout style={{ minWidth: 1260, height: '100%' }}>
		      <Header className="header">
		      	<AppHeader />
		      </Header>
		      <Content className="content">
	      		<Switch>
	      			<Route path='/program/:id' component={ProgramDetail} />
		      		<Route path='/program/new' component={ProgramNew} />
	      			<Route path='/project/new' component={ProjectNew} />
		      		<Route path='/project/:id/edit' component={ProjectEdit} />
		      		<Route path='/' component={DangerProjectList} />
		      	</Switch>
		      </Content>
		      <Footer className="footer">@copyright BigProject 2018</Footer>
	    	</Layout>
    	</BrowserRouter>
		)
	}
}


ReactDom.render(<App />, document.getElementById('root'));
