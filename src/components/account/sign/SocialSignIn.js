import React from "react";
// import { signInWithGoogle } from "../../../../firebase";
// import Google from "../../../../media/Google.png";
import { auth } from "../../../../firebase";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export default function SignIn(props) {
  // return (
  //   <div className="social-sign-in" onClick={() => signInWithGoogle()}>
  //     <img src={Google} alt="" />
  //     <div>Iniciar sesión con Google</div>
  //   </div>
  // );
  const uiConfig = {
    signInFlow: "popup",
    // signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        customParameters: {
          // Forces account selection even when one account
          // is available.
          prompt: "select_account",
        },
      },
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
    // Terms of service url.
    // tosUrl: "<your-tos-url>",
    // Privacy policy url.
    // privacyPolicyUrl: "<your-privacy-policy-url>",
  };
  auth.useDeviceLanguage();
  return (
    <StyledFirebaseAuth
      uiCallback={(ui) => ui.disableAutoSignIn()}
      uiConfig={uiConfig}
      firebaseAuth={auth}
    />
  );
}
