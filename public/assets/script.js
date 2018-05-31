$(document).ready(function () {
  $('.nav').on('click', ajaxCall);
  $('#close-btn-modal').on('click', hideModal);

  function ajaxCall(event) {
    let targetId = event.target.id;
    $.ajax({
      type: 'GET',
      dataType: "json",
      url: `/plotter/${targetId}`,
      success: (data) => {
        displayModal(data, targetId);
      }
    });
  }

  function hideModal() {
    $('.modal').css('display', 'none');
  }

  function displayModal(data, id) {
    $('.modal').css('display', 'block');
    let chartInfo = JSON.parse(data);
    let seasonList = Object.keys(chartInfo).map((ele) => {
      return parseInt(ele);
    });
    let startSeason = seasonList.reduce((ele1, ele2) => {
      return Math.min(ele1,ele2);
    });
    let endSeason = seasonList.reduce((ele1, ele2) => {
      return Math.max(ele1,ele2);
    });
    let numberPlayed = [];
    for(let i = startSeason; i <= endSeason; i++) {
      numberPlayed.push(chartInfo[i]);
    }
    if (id == 1) {
      Highcharts.chart('modal-content', {

        title: {
          text: 'Number Of Matches Played Per Season'
        },

        subtitle: {
          text: '2008-2017'
        },

        yAxis: {
          title: {
            text: 'Number of Matches Played'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: startSeason
          }
        },

        series: [{
          name: 'Number of matches played',
          data: numberPlayed
        }],

        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }

      });
    }
    else if (id == 2) {

    }
    else if (id == 3) {

    }
    else if (id == 4) {

    }
    else if (id == 5) {

    }
  }

});