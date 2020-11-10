import fb, { db } from "../../../../firebase"

const Sign = (props) => {
  console.log(props);
  const {sign, credentials} = props;
  const signIn = (credentials) => {
    fb.auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then((u) => {
      console.log(u);
    })
    .catch((err) => {
      console.log(err);
      if (err.code === "auth/wrong-password") {
        props.setAuthMsg(
          "La contraseña es inválida."
        );
      }
      else if (err.code === "auth/user-not-found") {
        props.setAuthMsg(
          "El correo no se encuentra registrado"
        )
      }
    });
  }

  const signUp = (credentials) => {
    fb.auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((user) => {
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
          props.setAuthMsg("El correo electrónico ya está tomado por otra cuenta");
        }
      });
  }
  return sign ? signIn(credentials) : signUp(credentials);
}

export default Sign;