var Doctor = require('./../js/doctor.js').doctorModule;

var noresults = function() {
  $('.displayresults').hide();
  $('.noresults').fadeIn();
};

var displayresults = function(doctor_list) {
  $('.noresults').hide();
  $('.displayresults').empty();
  doctor_list.forEach(function(doctor){
    $('.displayresults').append("<h3>here are some doctors you might be interested in seeing: "+doctor.list+"</h3>");
  })
  $('.displayresults').fadeIn();
};

$(function() {
  var lat = 45.5;
  var lon = -122.6;
  if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      $('#waiting_message').hide();
      $('.search').fadeIn();
    });
  } else {
    $('#waiting_message').hide();
    $('.search').fadeIn();
  }
  var doctore = new Doctor();
  $('.search').submit(function(event){
    event.preventDefault();
    var medicalIssue = $('#medicalIssue').val();
    doctore.getDoctors(medicalIssue,lat,lon,noresults,displayresults);
  });
});
