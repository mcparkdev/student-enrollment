import fb, { db } from "../../../firebase"

const Sign = (props) => {
  console.log(props);
  const {sign, credentials, language} = props;
  const {email, password} = credentials
  const persistSession = (email, password) => {
    fb.auth().setPersistence(fb.auth.Auth.Persistence.SESSION)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return fb.auth().signInWithEmailAndPassword(email, password);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode, errorMessage)
      });
  }
  const signIn = (credentials) => {
    fb.auth()
    .signInWithEmailAndPassword(email, password)
    .then((u) => {
      persistSession(email, password)
    })
    .catch((err) => {
      console.log(err);
      if (err.code === "auth/too-many-requests") {
        props.setAuthMsg({
          email:language === "korean"
          ? "많은 로그인 시도 실패로 인해 이 계정에 대한 액세스가 일시적으로 비활성화되었습니다. 암호를 재설정하여 즉시 복원하거나 나중에 다시 시도할 수 있습니다." 
          :'El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarla inmediatamente restableciendo su contraseña o puede intentarlo de nuevo más tarde.'
        });
      }
      else if (err.code === "auth/wrong-password") {
        props.setAuthMsg({
          password:language === "korean"
          ? "잘못된 비밀번호입니다. 다시 시도하거나 비밀번호 찾기를 클릭하여 재설정하세요." 
          :'La contraseña es incorrecta. Vuelve a intentarlo o haz clic en "Recuperar contraseña" para restablecerla.'
        }
        );
      }
      else if (err.code === "auth/user-not-found") {
        props.setAuthMsg({
          email: language === "korean"
          ? "이메일이 등록되어 있지 않습니다."
          : "El correo no se encuentra registrado."
        })
      }
    });
  }
  const signUp = (credentials) => {
    fb.auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((user) => {
        persistSession(email, password)
        // dispatch({type: USER_SIGNUP_SUCCESS}); // I dispatched some message.
        const data = db.collection('students').doc(user.user.uid).collection('data')
        const {firstName, lastName} = credentials
        data.doc("personal").set({
          firstName,
          lastName,
          birthDate: new Date ("2000-01-01"),
          gender: "",
          nationality: "Colombia",
          documentType: "" ,         
          documentNumber: "",
          documentDepartment: "Cundinamarca",
          documentCity: "Bogotá D.C.",
          email: credentials.email,
          createdAt: new Date(),
        }).then(()=>alert("Personal data updated"))
          .catch(err => {console.log(err);alert("Personal data could no be updated");})
        data.doc("responsible").set({
          gFirstName: "",
          gLastName: "",
          gRelationship: "mother",
          gMobile: "",
          gAddress: "",
          gEmail: "",
          createdAt: new Date(),
        }).then(()=>alert("Responsible data updated"))
          .catch(err => {console.log(err);alert("Responsible data could no be updated");})
        data.doc("residential").set({
          department: "Cundinamarca",
          city: "Bogotá D.C.",
          address: "",
          mobile: "",
          telephone: "",
          createdAt: new Date(),
        }).then(()=>alert("Residential data updated"))
          .catch(err => {console.log(err);alert("Residential data could no be updated");})
          data.doc("payment").set({
            bankingEntity: "",
            paymentType: "",
            payerName: "",
            createdAt: new Date(),
          }).then(()=>alert("Payment data updated"))
          .catch(err => {console.log(err);alert("Payment data could no be updated");})
        db.collection('students').doc(user.user.uid).set({
          personal: false, responsible: false, residential: false, payment: false
        })
          .then(()=>alert("Data validation updated"))
          .catch(err => {console.log(err);alert("Data validation error");})
        const documentID = new Date().getTime().toString()
        const historiesData = { createdAt: new Date(), record:{collection:"students", document:user.user.uid, action:"registered", user:{ firstName, lastName, id:user.user.uid} }}
        db.doc(`/histories/${documentID}`).set(historiesData)
          .then(()=>alert("History updated"))
          .catch(err => {console.log(err);alert("History could no be updated");})
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/email-already-in-use") {
          props.setAuthMsg({
            email:language === "korean"
            ? "이미 사용된 이메일입니다. 다른 이메일을 입력하세요." 
            :"Este correo ya se encuentra registrado. Elige otro."
          }
          );
        }
      });
  }
  return sign ? signIn(credentials) : signUp(credentials);
}

export default Sign;