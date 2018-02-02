/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-02-01 10:04:43
 * @version $Id$
 */
 import React,{ Component } from "react"
 import $ from "jquery"
 import Constants from '../utils/constants';


class record extends Component {

	constructor(){
		super();
		this.state={
			isEdit:false
		}
	}

	handelEdit(){
		this.setState({
			isEdit:!this.state.isEdit
		})
		console.log(this.state.isEdit)
	}

	cancelEdit(){
		this.setState({
			isEdit:false
		})
	}

	handelupdate(event){
		var that = this
  		event.preventDefault();
  		const data = {
  			date: that.refs.date.value,
  			title: that.refs.title.value,
  			amount: Number.parseInt(that.refs.amount.value, 0)
  		};
  		console.log(data)
		$.ajax({
			url:Constants.testApi+"/record/"+that.props.Record.id,
			type:"put",
			data:data,
			success:function(res){
				console.log(res)
				that.setState({
					isEdit:false
				})
				 that.props.updateList(that.props.Record,res)
				
				console.log(that.props)
				
			}


		})
	}

	handeDelete(event){
		var that = this
		event.preventDefault();

		$.ajax({
			url:Constants.testApi+"/record/"+that.props.Record.id,
			type:"delete",
			success:function(res){
				console.log(res)
				that.setState({
					isEdit:false
				})
				 that.props.deleteList(res)
				
				// console.log(that.props)
				
			}


		})
	}

  recordRow(){
  	return (
        <tr>
         <td>{this.props.Record.date}</td>
         <td>{this.props.Record.title}</td>
         <td>{this.props.Record.amount}</td>
         <td>
         <button className="btn btn-info mr-1" onClick={this.handelEdit.bind(this)}>编辑</button>
         <button className="btn btn-danger" onClick={this.handeDelete.bind(this)}>删除</button>
         </td>
         
        </tr>
    );
  }

  recordedit(){
  	return(
      <tr>
         <td><input type="text" className="form-control" defaultValue={this.props.Record.date} ref="date" /></td>
         <td><input type="text" className="form-control" defaultValue={this.props.Record.title} ref="title" /></td>
         <td><input type="text" className="form-control" defaultValue={this.props.Record.amount} ref="amount" /></td>
         <td>
         <button className="btn btn-info mr-1" onClick={this.handelupdate.bind(this)}>确定</button>
         <button className="btn btn-danger" onClick={this.cancelEdit.bind(this)}>取消</button>
         </td>
         
        </tr>
  	)
  }


render(){
	if(this.state.isEdit===false){
       return this.recordRow()
	}else{
       return this.recordedit()
	}
	
}



}

export default record;

