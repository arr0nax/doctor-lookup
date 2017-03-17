var apiKey = require('./../.env').apiKey;

function Doctor(name,specialty,description,phone_number,phone_type,accepts_new_patients,ratings) {
  this.name = name;
  this.specialty = specialty;
  this.description = description;
  this.phone_number = phone_number;
  this.phone_type = phone_type;
  this.accepts_new_patients = accepts_new_patients;
}

Doctor.prototype.getDoctors = function(medicalIssue,lat,lon,noresults,displayresults) {
  console.log(medicalIssue);
  console.log(apiKey);
  var doctor = this;
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location='+lat+'%2C'+lon+'%2C100&user_location='+lat+'%2C'+lon+'&skip=0&limit=20&user_key=' + apiKey)
   .then(function(response) {
      if(response.data.length > 0) {
        console.log(response);
        var doctor_list = [];
        for(var i = 0; i<response.data.length; i++){
          for(var j=0; j<response.data[i].practices.length;j++){
            name = response.data[i].practices[j].name;
            specialty = response.data[i].specialties[0].actor;
            description = response.data[i].specialties[0].description;
            phone_number = response.data[i].practices[j].phones[0].number;
            phone_type = response.data[i].practices[j].phones[0].type;
            accepts_new_patients = response.data[i].practices[j].accepts_new_patients;
            ratings = response.data[i].ratings;
            new_doctor = new Doctor(name,specialty,description,phone_number,phone_type,accepts_new_patients,ratings);
            doctor_list.push(new_doctor);
          }
        }
        displayresults(doctor_list);
      } else {
        noresults();
      }
    })
   .fail(function(error){
      noresults();
    });
};

exports.doctorModule = Doctor;
