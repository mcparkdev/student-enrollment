import React,{Component} from 'react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import "./input.scss"

export default class Input extends Component {
  state = {
    pass:{
      type:"password",
      show:false
    }
  }
  handlePass = () => {
    this.state.pass.show 
    ? (this.setState({pass:{"type":"password","show":false}}))
    :(this.setState({pass:{"type":"text","show":true}}))
  }
  render() {
    // console.log(this.props)
    const {pass} = this.state;
    const {placeholder, required} = this.props;
    const {type} = this.props.type !== undefined ? this.props : {type: "text"}
    const inputProps={
      ...this.props,
      ref:this.props.register,
      type: type === "password" ? pass.type : type,
      className: `input-${type}`,
      required: required !== undefined ? required : true,
      placeholder:"",
      register: undefined,
    }
    return (
      <li className={`input-container ${type}`}>
        <input {...inputProps}  ></input>
        <span className="input placeholder">{placeholder}</span>
        {type === "password" && (
          <span onClick={this.handlePass}>
            {pass.show ? <VisibilityOffIcon/> : <VisibilityIcon/>}
          </span>
        )}
      {this.props.children}
    </li>
    )
  }
}

// const Input = (props) => {
//   // state to Show/Hide the password
//   const [pass,setPass] = useState({
//     "type":"password",
//     "show":false,
//   });
//   // function to Show/Hide the password
//   const handlePass = () => {
//     pass.show 
//     ? (setPass({"type":"password","show":false}))
//     :(setPass({"type":"text","show":true}))
//   }

//   const {placeholder, required} = props;
//   const {type} = props.type !== undefined ? props : {type: "text"}
//   const inputProps={
//     ...props,
//     type: type === "password" ? pass.type : type,
//     className: `input-${type}`,
//     required: required !== undefined ? required : true,
//     placeholder:"",
//   }
//   return (
//     <li className={`input-container ${type}`}>
//       <input {...inputProps}></input>
//       <span className="input placeholder">{placeholder}</span>
//       {type === "password" && (
//         <span onClick={handlePass}>
//           {pass.show ? <VisibilityOffIcon/> : <VisibilityIcon/>}
//         </span>
//       )}
//       {props.children}
//     </li>
//   )
// }

// export default Input;