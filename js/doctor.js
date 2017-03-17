var apiKey = require('./../.env').apiKey;

function Doctor() {
}

Doctor.prototype.getDoctors = function(medicalIssue,lat,lon,noresults,displayresults) {
  console.log(medicalIssue);
  console.log(apiKey);
  var doctor = this;
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location='+lat+'%2C'+lon+'%2C100&user_location='+lat+'%2C'+lon+'&skip=0&limit=20&user_key=' + apiKey)
   .then(function(response) {
      if(response.data.length > 0) {
        console.log(response);
        doctor.result = response;
        doctor.list = [];
        for(var i = 0; i<response.data.length; i++){
          for(var j=0; j<response.data[i].practices.length;j++){
            doctor.list.push(response.data[i].practices[j].name);
          }
        }
        displayresults(doctor);
      } else {
        noresults();
      }
    })
   .fail(function(error){
      noresults();
    });
};

exports.doctorModule = Doctor;
