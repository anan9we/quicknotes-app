const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");

let notes = [];

function render() {
    notesList.textContent = "";

    notes.forEach((note) => {
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

        listItem.appendChild(text);
        listItem.appendChild(category);
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(date);
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(deleteButton);

        notesList.appendChild(listItem);
    });
}

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);

    render();

    noteInput.value = "";
});
