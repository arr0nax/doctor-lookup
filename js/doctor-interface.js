var Doctor = require('./../js/doctor.js').doctorModule;

$(function() {
  var doctore = new Doctor();
  var medicalIssue = 'toothache';
  doctore.getDoctors(medicalIssue);
});
