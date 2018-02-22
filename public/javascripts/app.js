$(document).ready(function() {

  gender = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  cPassword= '';
  type='';

  $("#signup-gender-man").on('click', function() {
    $('#signup-gender-man').addClass('signup-selected-gender');
    $('#signup-gender-woman').removeClass('signup-selected-gender');
    gender = 'man'
    $('#signup-chosen-gender').text("Man ");
    $('.signup-next-gender').removeClass('hidden');
  });
  $("#signup-gender-woman").on('click', function() {
    $('#signup-gender-woman').addClass('signup-selected-gender');
    $('#signup-gender-man').removeClass('signup-selected-gender');
    gender = 'woman'
    $('#signup-chosen-gender').text("Woman ");
    $('.signup-next-gender').removeClass('hidden');
  });

  $('#signup-first-name').change(function() {
    firstName = this.value;
    console.log(firstName);
    if(firstName.length > 0 && lastName.length > 0) {
      $('.signup-next-name').removeClass('hidden');
    } else {
      $('.signup-next-name').addClass('hidden');
    }
  });
  $('#signup-last-name').change(function() {
    lastName = this.value;
    console.log(lastName);
    if(firstName.length > 0 && lastName.length > 0) {
      $('.signup-next-name').removeClass('hidden');
    } else {
      $('.signup-next-name').addClass('hidden');
    }
  });

  $('#signup-email').change(function() {
    email = this.value;
    console.log(email);
    if(email.length > 0 && passwordsMatch()) {
      $('.signup-next-security').removeClass('hidden');
    } else {
      $('.signup-next-security').addClass('hidden');
    }
  });
  $('#signup-password').change(function() {
    password = this.value;
    console.log(password);
    if(password.length > 0 && passwordsMatch()) {
      $('.signup-next-security').removeClass('hidden');
    } else {
      $('.signup-next-security').addClass('hidden');
    }
  });
  $('#signup-confirm-password').change(function() {
    cPassword = this.value;
    console.log(cPassword);
    if(cPassword.length > 0 && passwordsMatch()) {
      $('.signup-next-security').removeClass('hidden');
    } else {
      $('.signup-next-security').addClass('hidden');
    }
  });
  function passwordsMatch() {
    if(password.length > 0 && password == cPassword) {
      console.log('passwords match');
      return true;
    }
    else {
      console.log("passwords don't match");
      return false;
    }
  }

  $("#signup-type-user").on('click', function() {
    $("#signup-type-user").addClass("signup-selected-type");
    $("#signup-type-doctor").removeClass("signup-selected-type");
    $("#signup-type-professional").removeClass("signup-selected-type")
    type="user";
    $('#signup-chosen-type').text("User ");
  });
  $("#signup-type-doctor").on('click', function() {
    $("#signup-type-doctor").addClass("signup-selected-type");
    $("#signup-type-user").removeClass("signup-selected-type");
    $("#signup-type-professional").removeClass("signup-selected-type")
    type="doctor";
    $('#signup-chosen-type').text("Doctor ");
  });
  $("#signup-type-professional").on('click', function() {
    $("#signup-type-professional").addClass("signup-selected-type");
    $("#signup-type-doctor").removeClass("signup-selected-type");
    $("#signup-type-user").removeClass("signup-selected-type")
    type="professional";
    $('#signup-chosen-type').text("Professional ");
  });
});