const doctorId = 1;

function renderAppointments() {
  const appts = window.api.getAppointmentsForDoctor(doctorId);
  const ul = document.getElementById("appt-list");
  ul.innerHTML = "";
  appts.forEach(
    (a) =>
      (ul.innerHTML += `<li>
      Patient: ${
        window.healthcareData.patients.find((p) => p.id === a.patientId).name
      }
      at ${a.datetime} ${a.completed ? "<span class='done'>Done</span>" : ""}
    </li>`)
  );
  // Fill for prescription
  const select = document.getElementById("appt-select");
  select.innerHTML = "";
  appts
    .filter((a) => !a.completed)
    .forEach(
      (a) =>
        (select.innerHTML += `<option value="${a.id}">
      Patient ${
        window.healthcareData.patients.find((p) => p.id === a.patientId).name
      } at ${a.datetime}
    </option>`)
    );
  // Pat list for caretaker
  const patselect = document.getElementById("pat-select");
  patselect.innerHTML = "";
  window.healthcareData.patients.forEach(
    (p) => (patselect.innerHTML += `<option value="${p.id}">${p.name}</option>`)
  );
}
document.getElementById("complete-form").onsubmit = function (e) {
  e.preventDefault();
  const apptId = +document.getElementById("appt-select").value;
  const prescText = document.getElementById("presc").value;
  window.api.completeAppointment(apptId, prescText);
  renderAppointments();
};
document.getElementById("care-form").onsubmit = function (e) {
  e.preventDefault();
  const patientId = +document.getElementById("pat-select").value;
  const name = document.getElementById("care-name").value;
  window.api.assignCaretaker(patientId, name);
};
setInterval(renderAppointments, 1000);
renderAppointments();
