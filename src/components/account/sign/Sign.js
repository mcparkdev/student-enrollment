import fb, { db } from "../../../firebase"
import firebase from "firebase/app";

const Sign = (props) => {
  const {sign, credentials, language} = props;
  const {email, password} = credentials
  const persistSession = (email, password) => {
    fb.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
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
        
        // const timestamp: FieldValue.serverTimestamp()
        const batch = db.batch()
        const studentDoc = db.doc(`/students/${user.user.uid}`)
        const {firstName, lastName} = credentials
        batch.set(studentDoc, {
          data:{
            personal:{
              firstName,
              lastName,
              birthDate: new Date ("2000-01-01"),
              gender: "",
              nationality: "Colombia",
              email: credentials.email,
              updated: false,
              createdAt: new Date(),
            },
            document:{
              type: "" ,         
              number: "",
              department: "Cundinamarca",
              city: "Bogotá D.C.",
              updated: false,
              createdAt: new Date(),
            },
            residential:{
              department: "Cundinamarca",
              city: "Bogotá D.C.",
              address: "",
              mobile: "",
              telephone: "",
              updated: false,
              createdAt: new Date(),
            },
            responsible:{
              gFirstName: "",
              gLastName: "",
              gRelationship: "mother",
              gMobile: "",
              gAddress: "",
              gEmail: "",
              updated: false,
              createdAt: new Date(),
            },
            adeveco:{
              certificateRef: ""
            },
            payment:{
              "Configuración 1":{
                bank: "",
                type: "",
                payer: "",
                studentBillRef: "",
                adminBillRef: "",
              }
            }
          },
          paymentHistory:{},
          courseHistory: {},
        })

        const documentID = new Date().getTime().toString()
        const historiesData = { createdAt: new Date(), collection:"students", document:user.user.uid, action:"register", before:{}, after:{ firstName, lastName, id:user.user.uid} }
        batch.set(db.doc(`/histories/${documentID}`),historiesData)
        batch.commit()
        .then(u=>console.log(u))
        .catch(err=>console.log(err))
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