//var config=require(__dirname + '\\config.json');
import React, {Component} from 'react';
import config from './config.json';
import styles from './greeter.less';//导入
// import avatar from './assets/avatar.png'

//className={styles.root}
class Greeter extends Component{
	render(){
		return (
			<div className={styles.root}>
				{config.greetText}
				{/*<image src={avatar}></image>*/}
				<div>hello world</div>
			</div>
		);
	}
}

export default Greeter