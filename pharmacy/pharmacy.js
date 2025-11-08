const pharmacyId = 1;

function renderOrders() {
  const orders = window.api.getPrescriptionsForPharmacy(pharmacyId);
  const ul = document.getElementById("orders-list");
  ul.innerHTML = "";
  orders.forEach(
    (p) =>
      (ul.innerHTML += `<li>
    Prescription for ${
      window.healthcareData.patients.find((pa) => pa.id === p.patientId).name
    }: ${p.text}
    - Status: ${p.fulfilled ? "<span class='done'>Delivered</span>" : "Pending"}
  </li>`)
  );
  // Fill select
  const select = document.getElementById("order-select");
  select.innerHTML = "";
  orders
    .filter((p) => !p.fulfilled)
    .forEach(
      (p) =>
        (select.innerHTML += `<option value="${p.id}">${
          window.healthcareData.patients.find((pa) => pa.id === p.patientId)
            .name
        }: ${p.text}</option>`)
    );
}
document.getElementById("fulfill-form").onsubmit = function (e) {
  e.preventDefault();
  const prescId = +document.getElementById("order-select").value;
  const msg = document.getElementById("contact-msg").value;
  window.api.fulfillPrescription(prescId, msg);
  renderOrders();
};
setInterval(renderOrders, 1000);
renderOrders();
