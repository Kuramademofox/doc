function renderUsers() {
  const ul = document.getElementById("users-list");
  ul.innerHTML = "";
  window.healthcareData.patients.forEach(
    (p) => (ul.innerHTML += `<li>Patient: ${p.name}</li>`)
  );
  window.healthcareData.doctors.forEach(
    (d) => (ul.innerHTML += `<li>Doctor: ${d.name}</li>`)
  );
  window.healthcareData.pharmacies.forEach(
    (ph) => (ul.innerHTML += `<li>Pharmacy: ${ph.name}</li>`)
  );
}
function renderAppointments() {
  const ul = document.getElementById("appt-list");
  ul.innerHTML = "";
  window.healthcareData.appointments.forEach(
    (a) =>
      (ul.innerHTML += `<li>Patient ${
        window.healthcareData.patients.find((p) => p.id === a.patientId).name
      } - Doctor ${
        window.healthcareData.doctors.find((d) => d.id === a.doctorId).name
      } - ${a.datetime} (${a.completed ? "Done" : "Pending"})</li>`)
  );
}
function renderPrescriptions() {
  const ul = document.getElementById("presc-list");
  ul.innerHTML = "";
  window.healthcareData.prescriptions.forEach(
    (p) =>
      (ul.innerHTML += `<li>Patient ${
        window.healthcareData.patients.find((pa) => pa.id === p.patientId).name
      } - ${p.text} - ${p.fulfilled ? "Delivered" : "Pending"}</li>`)
  );
}
function renderCaretakers() {
  const ul = document.getElementById("care-list");
  ul.innerHTML = "";
  window.healthcareData.caretakers.forEach(
    (c) =>
      (ul.innerHTML += `<li>Patient ${
        window.healthcareData.patients.find((pa) => pa.id === c.patientId).name
      } - Caretaker: ${c.name}</li>`)
  );
}
function tick() {
  renderUsers();
  renderAppointments();
  renderPrescriptions();
  renderCaretakers();
}
setInterval(tick, 1000);
tick();
