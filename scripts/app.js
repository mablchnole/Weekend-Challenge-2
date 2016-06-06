var dir;
var dirIndex = 0;

$(document).ready(function(){
  // method to load JSON data
  $.ajax({
    url: 'https://raw.githubusercontent.com/devjanaprime/2.4-jQueryAjaxJSON/master/students.json',
    dataType: 'json',
    success: function(data){
      dir = data;
      genProfile();
      genProfileBtns();
    }, // end success function
    statusCode: {
      404: function(){
        alert('error connecting to server');
      } // end 404
    } // end statusCode
  }); // end success
}); // end document ready



// function to generate and append data to DOM
function genProfile(){
  // create profile & append to DOM
  $('#directory').append('<div id="profile"><div id="profileImg"></div><div id="profileBio"></div></div>');
  $('#profileImg').html('<img class="img-circle img-fluid img-center" src="img/' + dir.students[dirIndex].first_name + dir.students[dirIndex].last_name + '.jpg">');
  $('#profileBio').html('<p><span>first name:</span> ' + dir.students[dirIndex].first_name + '<span>last name:</span> ' + dir.students[dirIndex].last_name + '</p><p><span>city:</span> ' + dir.students[dirIndex].city + '<span>shoutout:</span> ' + dir.students[dirIndex].shoutout + '</p>');
  $('#profileCount').append().text('(' + (dirIndex + 1) + '/' + dir.students.length + ')');

  // function for nextButton
  $('#nextButton').click(function(){
    $('#profile').fadeOut(1000, function(){
      if(dirIndex == dir.students.length-1){
        dirIndex = -1;
      }
      $('#profile').remove();
      dirIndex++;
      genProfileBtns();
      genProfile();
    });
  }); // end nextButton

  // function for prevButton
  $('#prevButton').click(function(){
    $('#profile').fadeOut(1000, function(){
      if(dirIndex === 0){
        dirIndex = dir.students.length;
      }
      $('#profile').remove();
      dirIndex--;
      genProfile();
    });
  }); // end of prevButton
} // end of genProfile

// function for genProfileBtns
function genProfileBtns(){
  var profileButton = document.createElement('button');
  profileButton.textContent = dir.students[dirIndex].first_name + ' ' + dir.students[dirIndex].last_name;
  profileButton.className = 'btn profileButton';
  $('#profileBtns').append(profileButton);
} // end profileButton

// click profileButton to view profile
$(document).on('click', '.profileButton', function(){
  console.log('profileButton clicked');
});
