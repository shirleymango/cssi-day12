window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
      
    if (user) {
      googleUser = user;
      getNotes(googleUser.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const getNotes = (userId) => {
    // 1) Get access to all the current user's notes 
    const dbRef = firebase.database().ref(`users/${userId}`);
    dbRef.on('value', (snapshot) => {
        renderData(snapshot.val());
    })
    // 2) Display them on the page
}

const renderData = (data) => {
    const destination = document.querySelector('#app');
    destination.innerHTML = "";
    for (let noteKey in data) {
        const note = data[noteKey];
        destination.appendChild(createCardDynamic(note));
    }
}

const createCard  = (note) => {
    return `<div class="column is-one-quarter"> 
                <div class="card"> 
                    <header class="card-header">
                        <p class="card-header-title">${note.title}</p>
                    </header> 
                    <div class="card-content">
                        ${note.text}
                    </div> 
                    <footer class="card-footer">
                        <a id="${noteId}" href="#" class="card-footer-item"
                        onclick="deleteNote('${noteId}')">
                            Delete
                        </a>
                    </footer>
                </div>
            </div>` ;
};

const createCardDynamic = (note) => {
    const element = document.createElement('div');
    element.classList.add("column");
    element.classList.add("is-one-quarter");
    element.innerHTML = `<div class="card"> 
                            <header class="card-header">
                                <p class="card-header-title">${note.title}</p>
                            </header> 
                        <div class="card-content">
                            ${note.text}
                        </div> 
                    </div>`;
    return element;
};