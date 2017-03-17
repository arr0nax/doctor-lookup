var apiKey = require('./../.env').apiKey;

function Doctor(name,specialty,description,phone_number,phone_type,accepts_new_patients,ratings,address,website) {
  this.name = name;
  this.specialty = specialty;
  this.description = description;
  this.phone_number = phone_number;
  this.phone_type = phone_type;
  this.accepts_new_patients = accepts_new_patients;
  this.ratings = ratings;
  this.address = address;
  this.website = website;
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
        for(var i=0; i<response.data.length; i++){
          for(var j=0; j<response.data[i].practices.length;j++){
            var name = response.data[i].practices[j].name;
            var specialty = response.data[i].specialties[0].actor;
            var description = response.data[i].specialties[0].description;
            var phone_number = response.data[i].practices[j].phones[0].number;
            var phone_type = response.data[i].practices[j].phones[0].type;
            var accepts_new_patients;
            if (response.data[i].practices[j].accepts_new_patients) {
              accepts_new_patients = 'accepting new patients';
            } else {
              accepts_new_patients = 'NOT accepting new patients';
            }
            var ratings = response.data[i].ratings;
            var address = response.data[i].practices[j].visit_address.street + ' ' + response.data[i].practices[j].visit_address.city + ', ' +response.data[i].practices[j].visit_address.state + ' ' + response.data[i].practices[j].visit_address.zip;
            var website = '/nowebsite';
            if (typeof response.data[i].practices[j].website != 'undefined') {
               website = response.data[i].practices[j].website;
            }
            new_doctor = new Doctor(name,specialty,description,phone_number,phone_type,accepts_new_patients,ratings,address,website);
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
