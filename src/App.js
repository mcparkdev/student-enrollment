import React, { useState, useEffect } from "react";
import "./App.scss";

// auth
import { auth, db } from "./firebase";
import "./firebase";

// custom Components
import Landing from "./components/landing/Landing";
import Enrollment from "./components/enrollment/Enrollment";
import Admin from "./components/admin/Admin";
import useWindowSize from "./WindowDimensions";

// third-parties
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import { useFieldArray } from "react-hook-form";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1479ff",
      // main: "#007fff",
    },
    // secondary: {
    //   main: "#ff80ab",
    //   contrastText: "#fff",
    // }
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
  const [userName, setUserName] = useState({firstName:"",lastName:""})
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
      console.log("User: ", user);
      console.log(auth.currentUser)
      if(user!==null){
        db.collection('students').doc(user.uid).collection('data').doc('personal').get()
        .then(doc => {
          if(!!doc){
            const data = doc.data()
            if (doc.data() !== undefined) {
              const {firstName, lastName} = data
              console.log(firstName, lastName)
              setUserName({firstName, lastName})
            }
          }
          else console.log("Document not found")
        })
        .catch(err=>console.log(err))
      }
    });
  }, []);
  const { height, width } = useWindowSize();
  const xs = ( width < 600)
  const sm = ( !xs && width < 960)
  const md = ( !sm && width < 1280)
  const lg = ( !md && width < 1920)
  const xl = ( width >= 1920)
  const viewport= { height, width, xs, sm, md, lg, xl}
  const nonMobile = xs ? {display:"none"} : {}
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          {isSignedIn && auth ? (
            <>
              {auth.currentUser.uid === "Yhn3f8vAjsVqtGCzNEM0zyPOrQq1" ?
                <>
                  <Redirect to="/management"/>
                  <Route
                    path="/"
                    render={({ match, history, location }) => {
                      const allProps = {router:{match,history,location}, nonMobile, viewport}
                      return (
                      <Admin {...allProps}/>
                    )}}
                  />
                </>
                :
                <>
                  <Redirect to="/home/announcements" /> 
                  <Route
                    path="/"
                    render={({ match, history, location }) => {
                      const allProps = {router:{match,history,location}, nonMobile, viewport, userName}
                      return (
                      <Enrollment {...allProps}/>
                    )}}
                  />
                </>
              }
            </>
          ) : (
            <>
              <Redirect to="/landing" />
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
              />
            </>
          )}
        </Router>
      </ThemeProvider>
    </div>
  );
}