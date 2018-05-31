$(document).ready(function(){
  $('.nav').on('click', ajaxCallAndDisplay);
  $('#close-btn-modal').on('click', hideModal);

  function ajaxCallAndDisplay(event) {
    //   $('.modal').css('display', 'block');
      let targetId = event.target.id;
      $.ajax({
        type: 'GET',
        dataType: "json",
        url: `/plotter/${targetId}`,
        success: (data) => {
           console.log(data);
        }
      });
  }

  function hideModal() {
      $('.modal').css('display', 'none');
  }

});