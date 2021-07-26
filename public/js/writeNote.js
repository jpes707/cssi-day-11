let googleUser = null;

window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(`logged in as ${user.displayName}`);
            googleUser = user;
        } else {
            console.log("not logged in");
        }
    });

    const createNoteButton = document.querySelector("#noteButton");
    createNoteButton.addEventListener("click", () => {
        const noteTitle = document.querySelector("#noteTitle").value;
        const noteText = document.querySelector("#noteText").value;

        firebase.database().ref(`/users/${googleUser.uid}`).push({
            title: noteTitle,
            text: noteText
        }).then(() => {
            document.querySelector("#noteTitle").value = "";
            document.querySelector("#noteText").value = "";
        }).catch(error => {
            console.log("error writing new note: ", error);
        });
    });
}
