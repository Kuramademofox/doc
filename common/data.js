// In-memory database for the demo (shared by all apps)
window.healthcareData = {
  patients: [
    {
      id: 1,
      name: "Alice",
      appointments: [],
      prescriptions: [],
      caretakerAssigned: false,
    },
    {
      id: 2,
      name: "Bob",
      appointments: [],
      prescriptions: [],
      caretakerAssigned: false,
    },
  ],
  doctors: [
    { id: 1, name: "Dr. Smith", appointments: [] },
    { id: 2, name: "Dr. Kim", appointments: [] },
  ],
  pharmacies: [{ id: 1, name: "PharmaPlus", orders: [] }],
  admins: [{ id: 1, name: "SuperAdmin" }],
  appointments: [],
  prescriptions: [],
  caretakers: [],
};

// Utility functions for demo
window.api = {
  // Appointments
  bookAppointment(patientId, doctorId, datetime) {
    const appt = {
      id: window.healthcareData.appointments.length + 1,
      patientId,
      doctorId,
      datetime,
      completed: false,
    };
    window.healthcareData.appointments.push(appt);
    window.healthcareData.patients
      .find((p) => p.id === patientId)
      .appointments.push(appt.id);
    window.healthcareData.doctors
      .find((d) => d.id === doctorId)
      .appointments.push(appt.id);
    return appt;
  },
  getAppointmentsForPatient(patientId) {
    return window.healthcareData.appointments.filter(
      (a) => a.patientId === patientId
    );
  },
  getAppointmentsForDoctor(doctorId) {
    return window.healthcareData.appointments.filter(
      (a) => a.doctorId === doctorId
    );
  },
  completeAppointment(apptId, prescriptionText) {
    const appt = window.healthcareData.appointments.find(
      (a) => a.id === apptId
    );
    if (appt) appt.completed = true;
    const prescription = {
      id: window.healthcareData.prescriptions.length + 1,
      appointmentId: apptId,
      patientId: appt.patientId,
      doctorId: appt.doctorId,
      pharmacyId: 1,
      text: prescriptionText,
      fulfilled: false,
    };
    window.healthcareData.prescriptions.push(prescription);
    window.healthcareData.patients
      .find((p) => p.id === appt.patientId)
      .prescriptions.push(prescription.id);
    window.healthcareData.pharmacies[0].orders.push(prescription.id);
    return prescription;
  },
  getPrescriptionsForPatient(patientId) {
    return window.healthcareData.prescriptions.filter(
      (p) => p.patientId === patientId
    );
  },
  getPrescriptionsForPharmacy(pharmacyId) {
    return window.healthcareData.prescriptions.filter(
      (p) => p.pharmacyId === pharmacyId
    );
  },
  fulfillPrescription(prescId, contactMsg) {
    const presc = window.healthcareData.prescriptions.find(
      (p) => p.id === prescId
    );
    if (presc) presc.fulfilled = true;
    presc.contactMsg = contactMsg;
  },
  assignCaretaker(patientId, name) {
    window.healthcareData.caretakers.push({ patientId, name });
    window.healthcareData.patients.find(
      (p) => p.id === patientId
    ).caretakerAssigned = true;
  },
  getCaretakerForPatient(patientId) {
    return window.healthcareData.caretakers.find(
      (c) => c.patientId === patientId
    );
  },
};
