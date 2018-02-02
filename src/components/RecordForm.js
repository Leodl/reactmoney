/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-02-01 15:26:58
 * @version $Id$
 */
 import React,{ Component } from "react"
  import Constants from '../utils/constants';
 import $ from "jquery";
 // import moment from 'moment';
import 'moment/locale/zh-cn';


import { DatePicker } from 'antd';
// import serializeJSON from '../utils/jquery.serializejson.min.js'



class RecordForm extends Component {

constructor(props) {  //初始化函数，每次class一个类，就初始化
    super(props);  //super执行父类的构造函数方法
    //this.age = this.props.age;w
    this.state={
      date:"",
      title:"",
      amount:""
    }
    console.log(props)
      
  }

  	isClick(){
console.log(this.state.title)
  		return this.state.date && this.state.title && this.state.amount;   //返回true或者false
  		// let val = this.state.date + this.state.title + this.state.amount;
  		// console.log(val)
    //     var isdisabled=null;
  		// if($.trim(val)==""){
  			
    //        isdisabled=false;
  		// }else{
  			
  		// 	isdisabled=true;
  		// }
  		// console.log(isdisabled)

  
  		//  return isdisabled

  	
  	}

   onChange(date, dateString,event) {
  		console.log(dateString);
  		  this.setState({
  		  	date:dateString
  		  })
  	}

  	handChange(event){
       let name ,obj;
       console.log(event.target.name)
         console.log(event.target.value)
       name = event.target.name
       this.setState((
           obj = {},
           obj[""+name]=event.target.value,
           obj
       ))

  	}

  	handelOnsubmit(event){
  		var that = this
  		event.preventDefault();
  		const data = {
  			date: this.state.date,
  			title: this.state.title,
  			amount: Number.parseInt(this.state.amount, 0)
  		};
  		//var datas = JSON.stringify(data)
  		$.ajax({
  			url:Constants.testApi+"/record",
  			type:"post",
  			data:data,
  			success:function(res){
             console.log(res)
             that.setState({
             	date:"",
             	title:"",
             	amount:""
             })
             that.props.newList(res)
  			}
  		})
  	}


	


    


  render() {
  //const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

console.log(this.props.totalAmount())
  
  
    return (
    	<div className="row">
    	<div className="col-md-12 col-sm-12">
    	<div className="col-lg-12 ">
    	<form id="searchForm" onSubmit={this.handelOnsubmit.bind(this)}>
    	<div className="input-icon input-inline">
    	<i className="fa fa-calendar"></i>
    	<DatePicker  onChange={this.onChange.bind(this)} name="date" />
    	<input type="text" name="checkdate" placeholder="标题" onChange={this.handChange.bind(this)} name="title" className="form-control " value={this.state.title}  />
    	<input type="text" name="checkdate" placeholder="收入" onChange={this.handChange.bind(this)} name="amount" className="form-control " value={this.state.amount} />
    	</div>
    	<div className="search">
    	<input type="submit" className="btn btn-info btn-search" disabled={!this.isClick()} value="提交"/>
    	</div>
    	<div className="total">
    	<p>总金额:{this.props.totalAmount()}</p>
    	</div>

    	</form>
    	</div>
    	</div>
    	</div>
    );
  }
}

export default RecordForm;
