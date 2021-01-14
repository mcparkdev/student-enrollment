import React, { useState, useEffect } from "react";
import "./App.scss";
// import "./index.scss"

// auth
import { auth } from "./firebase";
import "./firebase";

// custom Components
import useWindowSize from "./WindowDimensions";

// third-parties
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Account from "./components/account/Account";
import Button from "@material-ui/core/Button"
import Admin from "./components/admin/Admin";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#20416D",
      // main: "#007fff",
    },
    secondary: {
      main: "#f3f8ff",
      contrastText: "#758EAF",
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Poppins',
      '"Segoe UI"',
      // 'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    button: {
      textTransform: 'none'
    }
  },
});

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  // const [userName, setUserName] = useState({firstName:"",lastName:""})
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
      console.log("User: ", user);
      // console.log(auth.currentUser)
    
      // if(user!==null){
      //   db.collection('students').doc(user.uid).collection('data').doc('personal').get()
      //   .then(doc => {
      //     if(!!doc){
      //       const data = doc.data()
      //       if (doc.data() !== undefined) {
      //         const {firstName, lastName} = data
      //         console.log(firstName, lastName)
      //         setUserName({firstName, lastName})
      //       }
      //     }
      //     else console.log("Document not found")
      //   })
      //   .catch(err=>console.log(err))
      // }
    });
  }, []);
  const { height, width } = useWindowSize();
  const xs = 600
  const sm = 960
  const md = 1280
  const lg = 1920
  const isMobile = width < sm
  const viewport= { height, width, xs, sm, md, lg}
  const appProps = {isMobile, viewport, auth}
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          {isSignedIn && auth ? (
            <>
              {auth.currentUser.email ==="mc.park@uniandes.edu.co" ?
                <>
                  <Redirect to="/database"/>
                  <Route path="/" render={router => <Admin {...appProps} router={router}/> } />
                </>
                :
                <div>
                  학생
                  <Button variant="contained" color="primary" onClick={()=>auth.signOut()}>로그아웃</Button>
                  {/* <Redirect to="/home/announcements" /> 
                  <Route
                    path="/"
                    render={({ match, history, location }) => {
                      const allProps = {router:{match,history,location}, nonMobile, viewport, userName}
                      return (
                      <Enrollment {...allProps}/>
                    )}}
                  /> */}
                </div>
              }
            </>
          ) : (
            <>
            <Account/>
              {/* <Redirect to="/landing" />
              <Route
                exact
                path="/landing"
                render={({ match, history, location }) => (
                  <Landing
                    viewport={viewport}
                    match={match}
                    history={history}
                    location={location}
                    nonMobile={nonMobile}
                  />
                )}
              /> */}
            </>
          )}
        </Router>
      </ThemeProvider>
    </div>
  );
}