let googleUserId = '';

window.onload = event => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("Signed in as " + user.displayName);
            googleUserId = user.uid;
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
    console.log(data);
    
    let sortedData = [];
    for (const noteItem in data) {
        const note = data[noteItem];
        console.log(note.title, note.text);
        // cards += createCard(note, noteItem);
        sortedData.push([note, noteItem]);
    }

    sortedData.sort(function(a, b) {
        return a[0]['title'].localeCompare(b[0]['title']);
    });

    sortedData.forEach((sortedElement) => {
        cards += createCard(sortedElement[0], sortedElement[1]);
    });

    document.querySelector("#app").innerHTML = cards;
}

const createCard = (note, noteId) => {
    const colorOptions = ['#56C4E8', '#D0E068', '#CD9EC0', '#ED839D', '#FFE476'];
    const backgroundColor = colorOptions[Math.floor(Math.random() * colorOptions.length)]
    return `
        <div class="column is-one-quarter">
            <div class="card" style="background:${backgroundColor};">
                <header class="card-header">
                    <p class="card-header-title">${note.title}</p>
                </header>
                <div class="card-content">
                    <div class="content">${note.text}</div>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item" onclick="editNote('${noteId}')">Edit</a>
                    <a href="#" class="card-footer-item" onclick="deleteNote('${noteId}')">Delete</a>
                </footer>
            </div>
        </div>
    `;    
}

const toggleEditNoteModal = () => {
    const editNoteModal = document.querySelector('#editNoteModal');
    editNoteModal.classList.toggle('is-active');
}

const editNote = (noteId) => {
    const notesRef = firebase.database().ref(`users/${googleUserId}`);
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        const note = data[noteId];
        document.querySelector('#editTitleInput').value = note.title;
        document.querySelector('#editTextInput').value = note.text;
        document.querySelector('#editNoteId').value = noteId;
    });
    toggleEditNoteModal();
}

const saveEditedNote = () => {
    const noteTitle = document.querySelector('#editTitleInput').value;
    const noteText = document.querySelector('#editTextInput').value;
    const noteId = document.querySelector('#editNoteId').value;
    const noteEdits = {
        title: noteTitle,
        text: noteText
    }
    firebase.database().ref(`users/${googleUserId}/${noteId}`).update(noteEdits);
    toggleEditNoteModal();
}

const toggleDeleteNoteModal = () => {
    const deleteNoteModal = document.querySelector('#deleteNoteModal');
    deleteNoteModal.classList.toggle('is-active');
}

const deleteNote = (noteId) => {
    document.querySelector('#deleteNoteId').value = noteId;
    toggleDeleteNoteModal();
}

const saveDeletedNote = () => {
    const noteId = document.querySelector('#deleteNoteId').value;
    firebase.database().ref(`users/${googleUserId}/${noteId}`).remove();
    toggleDeleteNoteModal();
}
