// --- Funciones de almacenamiento ---
function getStudents() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

function saveStudent(student) {
  const students = getStudents();
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
}

function saveStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

function deleteStudent(index) {
  const students = getStudents();
  if (index >= 0 && index < students.length) {
    students.splice(index, 1); // elimina por posición
    saveStudents(students);
    renderList(); // refresca la lista
  }
}

// --- Router ---
function router() {
  const path = location.hash.slice(1) || "/";
  const app = document.getElementById("app");
  app.innerHTML = "";

  let templateId;

  if (path === "/") {
    templateId = "form-template";
  } else if (path === "/lista") {
    templateId = "list-template";
  } else {
    templateId = "404-template";
  }

  const template = document.getElementById(templateId);
  app.appendChild(template.content.cloneNode(true));

  if (path === "/") {
    attachFormLogic();
  } else if (path === "/lista") {
    renderList();
  }
}

// --- Lógica del formulario ---
function attachFormLogic() {
  const form = document.getElementById("studentForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const n1 = parseFloat(document.getElementById("note1").value);
    const n2 = parseFloat(document.getElementById("note2").value);
    const n3 = parseFloat(document.getElementById("note3").value);

    if (!name || isNaN(n1) || isNaN(n2) || isNaN(n3)) {
      document.getElementById("msg").textContent =
        "⚠️ Debes llenar todos los campos.";
      return;
    }

    const avg = (n1 + n2 + n3) / 3;
    saveStudent({ name, avg });

    document.getElementById(
      "msg"
    ).textContent = `✅ Estudiante ${name} guardado con promedio ${avg.toFixed(
      2
    )}`;

    form.reset();
  });
}

// --- Renderizar lista ---
function renderList() {
  const students = getStudents();
  const list = document.getElementById("studentList");
  list.innerHTML = ""; // limpiar lista

  if (students.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No hay estudiantes registrados";
    list.appendChild(empty);
    return;
  }

  const template = document.getElementById("student-item-template");

  students.forEach((s, i) => {
    // Clonar el template
    const clone = template.content.cloneNode(true);

    // Rellenar datos
    clone.querySelector(".student-name").textContent = s.name;
    clone.querySelector(".student-avg").textContent = s.avg.toFixed(2);

    // Asignar evento al botón
    clone.querySelector(".delete-btn").addEventListener("click", () => {
      deleteStudent(i);
    });

    // Agregar al <ul>
    list.appendChild(clone);
  });
}

// --- Eventos ---
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
