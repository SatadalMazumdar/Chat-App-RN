import firebase from "firebase";

class Firebase {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () => {
    firebase.initializeApp({
      apiKey: "AIzaSyA2-x0Ov--tIq_ROd_oHbpwDFxrXH84NSI",
      authDomain: "reactbootcamp-488e2.firebaseapp.com",
      databaseURL: "https://reactbootcamp-488e2.firebaseio.com",
      projectId: "reactbootcamp-488e2",
      storageBucket: "reactbootcamp-488e2.appspot.com",
      messagingSenderId: "845266293496",
      appId: "1:845266293496:web:6a013893b56d63f1"
    });
  };

  observeAuth = () => {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  };

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {}
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref("message");
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);

    const message = {
      _id,
      timestamp,
      text,
      user
    };
    return message;
  };

  on = callback => {
    this.ref
      .limitToLast(50)
      .on("child_added", snapshot => callback(this.parse(snapshot)));
  };

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  off() {
    this.ref.off();
  }
}

Firebase.shared = new Firebase();
export default Firebase;
