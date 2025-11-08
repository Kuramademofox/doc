// DEMO: patient Alice, id:1
const patientId = 1;

function renderDoctors() {
  const select = document.getElementById("doctor-select");
  window.healthcareData.doctors.forEach(
    (d) => (select.innerHTML += `<option value="${d.id}">${d.name}</option>`)
  );
}
renderDoctors();

function book() {
  const doctorId = +document.getElementById("doctor-select").value;
  const datetime = document.getElementById("datetime").value;
  const appt = window.api.bookAppointment(patientId, doctorId, datetime);
  renderAppointments();
}

function renderAppointments() {
  const appts = window.api.getAppointmentsForPatient(patientId);
  const ul = document.getElementById("appt-list");
  ul.innerHTML = "";
  appts.forEach((a) => {
    ul.innerHTML += `<li>
      With ${
        window.healthcareData.doctors.find((d) => d.id === a.doctorId).name
      } at ${a.datetime}
      ${a.completed ? " - <span class='done'>Completed</span>" : ""}
    </li>`;
  });
}
function renderPrescriptions() {
  const presc = window.api.getPrescriptionsForPatient(patientId);
  const ul = document.getElementById("presc-list");
  ul.innerHTML = "";
  presc.forEach((p) => {
    ul.innerHTML += `<li>
      ${p.text} - Status: ${
      p.fulfilled
        ? `<span class='done'>Delivered</span>`
        : `<span>Pending</span>`
    }
    </li>`;
  });
}
function renderPharmaContact() {
  const presc = window.api
    .getPrescriptionsForPatient(patientId)
    .find((p) => p.contactMsg);
  document.getElementById("pharma-contact").innerText = presc
    ? presc.contactMsg
    : "Pending...";
}
function renderCaretaker() {
  const c = window.api.getCaretakerForPatient(patientId);
  document.getElementById("caretaker-info").innerText = c
    ? c.name
    : "None assigned";
}
function tick() {
  renderAppointments();
  renderPrescriptions();
  renderPharmaContact();
  renderCaretaker();
}
setInterval(tick, 1000); 
tick();
