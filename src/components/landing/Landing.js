import React,{useState} from "react";
import "./landing.scss";
import bg from "../../media/8.jpg";
import Banner from "./banner/Banner";
import Navbar from "./navbar/Navbar";

export default function Landing(props) {
  // true: Sign In, false: Sign Out
  const[sign,setSign]=useState(true);

  // function to swap between Sign In and Sign Out
  const handleSign = (state) => {
    setSign(state)
  }

    // state to hide account
  const [hideAccount,setHideAccount] = useState(true)

  const handleAccount = (hide,sign) => {
    setHideAccount(hide);
    handleSign(sign)
  }
    
  return (
    <div className="landing">
      <div className="bg-image">
        {/* Adjustment layers */}
        <div className="bg-layer-1"></div>
        <div className="bg-layer-2"></div>
        {/* Background image */}
        <img id="bg" src={bg} alt="bg"/>
      </div>   
      {/* Navbar */}
      <Navbar {...props}/>
      {/* Banner */}
      <Banner 
        {...props} 
        sign={sign} 
        handleSign={handleSign}
        hideAccount={hideAccount} 
        setHideAccount={setHideAccount}
        handleAccount={handleAccount}
      />
    </div>
  );
}
