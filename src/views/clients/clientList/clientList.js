import React, { Component } from 'react';
import { connect } from 'dva';
import style from "./clientList.scss";
import { Table, Pagination, Tag } from 'antd';
class ClientList extends Component {
    state = {  }
    column=[{
        title: 'Name',
        dataIndex: 'displayName',
        key: 'displayName',
      },
      {
        title: 'Client#',
        dataIndex: 'accountNo',
        key: 'accountNo',
      },
      {
        title: 'External Id',
        dataIndex: 'externalId',
        key: 'externalId',
      },  {
        title: 'Status',
        dataIndex: 'active',
        key: 'active',
        render:status=>{
            if(status){
                return <Tag  color={'green'} key={'active'} />

            }else{
                return <Tag  color={'geekblue'} key={'disactive'} />
 
            }
        }
      },
      {
        title: 'Office',
        dataIndex: 'staffName',
        key: 'staffName',
      },
      {
        title: 'Staff',
        dataIndex: 'address',
        key: 'address',
      }]
      onChangPage =(ev)=>{
          console.log(ev)
      }
      componentWillMount(){
          this.props.dispatch({type:"clients/clientList",payload:{limit:10,offset:0}})

      }
    render() { 
        return ( 
            <div className={style.container}>
                <div className={style.search}></div>
                <div className={style.content}>
                    <Table 
                    columns={this.columns} 
                    dataSource={this.props.clients} 
                    pagination={false}
                    rowKey={client=>client.id}
                     />
                    <Pagination current={1} pageSize={15} onChange={this.onChangPage} total={50}/>
                </div>
            </div>
         );
    }
}
 function mapStateToProps(state){
     console.log(state.clients)
     return {
         clients:state.listclient
     }
 }
export default connect(mapStateToProps)(ClientList);