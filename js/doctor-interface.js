var Doctor = require('./../js/doctor.js').doctorModule;

var noresults = function() {
  $('.displayresults').hide();
  $('.noresults').fadeIn();
};

var displayresults = function(doctor_list) {
  $('.noresults').hide();
  $('.displayresults').empty();
  doctor_list.forEach(function(doctor){
    $('.displayresults').append("<div class='panel panel-info'><div class='panel-heading'><h4 class='pull-right'><i>"+doctor.specialty+"</i></h4><h3>"+doctor.name+"</h3></div><div class='panel-body'><h4 class='display-block'>"+doctor.description+"</h4><h4><i>"+doctor.accepts_new_patients+"</i></h4><h4><a href='"+doctor.website+"' target='_blank'>Website of "+doctor.name+"</a></h4><h4>"+doctor.phone_type+": "+doctor.phone_number+"</h4><h4 class='pull-right'><i>"+doctor.address+"</i></h4></div></div>");
  });
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
