window.onload = event => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("Signed in as " + user.displayName);
            const googleUserId = user.uid;
            getNotes(googleUserId);
        } else {
            window.location = "index.html";
        }
    });
}

const getNotes = (userId) => {
    const notesRef = firebase.database().ref(`/users/${userId}`);
    notesRef.on('value', (snapshot) => {  // calls it once (on page load here), then whenever the database values change
        const data = snapshot.val();
        renderDataAsHtml(data);
    });
}

const renderDataAsHtml = (data) => {
    let cards = ``;
    for (const noteItem in data) {
        const note = data[noteItem];
        console.log(note.title, note.text);
        cards += createCard(note);
    }
    document.querySelector("#app").innerHTML = cards;
}

const createCard = (note) => {
    return `
        <div class="column is-one-quarter">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">${note.title}</p>
                </header>
                <div class="card-content">
                    <div class="content">${note.text}</div>
                </div>
            </div>
        </div>
    `;    
}
