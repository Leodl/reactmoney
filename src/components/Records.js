/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-02-01 09:42:13
 * @version $Id$
 */
 import React, { Component } from 'react';
 import Record from "./Record";
 import '../App.css';
 import RecordForm from "./RecordForm";
 import $ from "jquery"
 import Constants from '../utils/constants';





class records extends Component {
	constructor(){
		
		super();
		this.state = {
			records: [
			// {"id": 1, "date": "2018-01-09", "title": "收入", "amount": 20},
			// {"id": 2, "date": "2018-01-03", "title": "录视频收入", "amount": 199},
			// {"id": 2, "date": "2018-01-03", "title": "录视频收入", "amount": 199},
			],
			isloaded:false
		}


	}

	componentDidMount(){
		
		var that  = this;
		$.ajax({
			url:Constants.testApi+"/record",
			type:"get",
			success:function(res){
				console.log(res)
             // this.state.records
             that.setState({records:res})
          


			}
		})
	}

	newList(data){
      this.setState({
      	records:[
      	...this.state.records,  //...对象混合在一起赋值给数组
      	data
      	]
      })
	}

   updateList(record,data){
    
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map( (item, index) => {
      if(index !== recordIndex) {
        // This isn't the item we care about - keep it as-is
        return item;
      }

      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...data
      };
    });
    this.setState({
      records: newRecords
    });
   
   }

   deleteList(data){
       this.state.records.map((val,i)=>{
       	if(val.id===data.id){
          this.state.records.splice(i,1)
       	}
       })
       console.log(this.state.records)
       this.setState({
       	records:this.state.records
       })
   }

   totalAmount(){
   	  var total =0;
   	  this.state.records.map((val,i)=>{
          total+=Number(val.amount)
   	  })
    
      return total;

      
   }
     


  render() {
  	 
  	 const {isloaded,records} = this.state;



  
    return (

     <div className="row main">
     <div className="col-md-6 col-sm-6">
      <h2>财务管理</h2>
      <RecordForm newList={this.newList.bind(this)} totalAmount={this.totalAmount.bind(this)} />
      <table className="table table-bordered">
        <thead>
          <tr>
           <th>时间</th>
           <th>标题</th>
           <th>金额</th>
           <th>操作</th>

          </tr>
        </thead>
        <tbody>
         {records.map((record,i)=> <Record key={i} Record={record} updateList={this.updateList.bind(this)} deleteList={this.deleteList.bind(this)}/>)} 
      
        </tbody>
      </table>
      </div>
      </div>
    );
  }
}

export default records;

