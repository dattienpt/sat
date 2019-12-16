import React, { Component } from 'react';
import style from './clientDetail.scss'
import avatar from "IMAGE/avatar.jpg";

import { connect } from 'dva';
import { Card } from 'antd';
class ClientDetail extends Component {
    state = {  }
    componentWillMount(){
        
        this.props.dispatch({type:"clients/clientDetail",payload:{id:this.props.match.params.idClient}});
        this.props.dispatch({type:"users/namePage",namePage:'Client deatil' });

    }
    render() { 
        const {client} =this.props;
        return ( 
            <div className={style.container}>
                <div>
                    <Card title={client.displayName} bordered={true} style={{ width: 300 }} >
                        <div>
                            <img src={avatar} />
                        </div>
                    </Card>
                </div>
                
            </div>
         );
    }
}
 function mapStateToProps(state){
     return {
         client:state.clients.client
     }
 }
export default connect(mapStateToProps)(ClientDetail);