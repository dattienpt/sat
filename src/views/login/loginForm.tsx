import * as React from "react";

class LoginForm extends React.Component {
   constructor(props: any) {
      super(props);
   }

   onLogin=()=>{

   }

   render() {
      return <button onClick={this.onLogin}>Login</button>;
   }
}

export default LoginForm;
