const addbtn = document.getElementById('add-btn');

const note = JSON.parse(localStorage.getItem('notes'));

if (note) {
  note.forEach((e) => {
    addnote(e)
  })
}

addbtn.addEventListener("click", (e) => {
  addnote();
});

function addnote(note = ' ') {
  const notes = document.createElement('div');
  notes.classList.add("notes");

  notes.innerHTML = `<div class="notes"> <div class="tools"> <button id="edit"> <i class="fa-solid fa-file-pen"></i>/</button> <button id="delete"><i class="fa-solid fa-trash"></i></button> </div> <div class="main hidden"></div> <textarea class="textarea"></textarea> </div> `;

  const editbtnn = notes.querySelector('#edit');
  const deletebtn = notes.querySelector('#delete');
  // const notes = document.querySelector('.notes'); 
  const main = notes.querySelector('.main');
  const textarea = notes.querySelector('.textarea');

  textarea.value = note;
  main.innerHTML = note;

  editbtnn.addEventListener("click", () => {
    main.classList.toggle('hidden');
    textarea.classList.toggle('hidden');
  });

  deletebtn.addEventListener("click", (e) => {
    const oldnote = JSON.parse(localStorage.getItem('notes'));
    var updatednotes = [];
    updatednotes = oldnote.filter((e) => {
     return e!=textarea.value;
    });
    console.log(updatednotes);

    localStorage.setItem("notes",  JSON.stringify(updatednotes));
    notes.remove();
  });

  textarea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    updateLS();
  });

  document.body.appendChild(notes)
}


function updateLS() {
  const noteTxt = document.querySelectorAll('textarea');

  const notes = [];
  noteTxt.forEach((e) => {
    notes.push(e.value);
  });
  localStorage.setItem('notes', JSON.stringify(notes));
}