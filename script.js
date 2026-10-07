const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function render(notesToRender = notes) {
    notesList.textContent = "";

    if (notesToRender.length === 0 && searchInput.value.trim() !== "") {
        const noResults = document.createElement("li");
        noResults.textContent = "No notes match your search.";
        notesList.appendChild(noResults);
        return;
    }

    notesToRender.forEach((note) => {
        const listItem = document.createElement("li");

        listItem.classList.add(
            `category-${note.category.toLowerCase()}`
        );

        const text = document.createElement("p");
        text.textContent = note.text;

        const category = document.createElement("small");
        category.textContent = note.category;
        category.classList.add("category-label");

        const date = document.createElement("small");
        date.textContent = note.createdAt;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            notes = notes.filter((item) => item.id !== note.id);

            saveNotes();
            render(getFilteredNotes());
            updateCount();
        });

        listItem.appendChild(text);
        listItem.appendChild(category);
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(date);
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(deleteButton);

        notesList.appendChild(listItem);
    });

    updateCount();
}

function updateCount() {
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}

function getFilteredNotes() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === "") {
        return notes;
    }

    return notes.filter((note) =>
        note.text.toLowerCase().includes(searchTerm)
    );
}

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
        return;
    }

    errorMessage.textContent = "";

    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);

    saveNotes();
    render(getFilteredNotes());

    noteInput.value = "";
});

searchInput.addEventListener("input", () => {
    render(getFilteredNotes());
});

render();