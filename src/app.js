// module takes in two arguments, a name and a list of dependencies:
angular.module('App',["chart.js"])
  .controller('MainCtrl',function($scope,$http){

  $scope.months = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"]
  $scope.claims = []

  // $scope.airlineMonthlyClaimLoss = [
  //   // {"Delta": [65, 59, 80, 81, 56, 55, 40, 30, 18, 24, 17, 55]}
  // ];

  // $scope.airportAvgMonthlyClaims = []

  $scope.lineLabels = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
  $scope.lineSeries = ['Series A', 'Series B'];
  $scope.lineData = [
    // $scope.airlineClaimLoss[0]["Delta"],
    [78, 28, 10, 36, 77, 77, 60, 20, 18, 44, 27, 85],
    [28, 48, 40, 19, 86, 27, 90, 30, 28, 14, 37, 75]
  ];

  function streamCSV(data){
    Papa.parse(data,{
      header: true,
      step: function(results,parser){
        // console.log("row data: ", results.data[0]);
        const disposition = results.data[0]["Disposition"].trim().toLowerCase()
        const validClaim = (disposition !== "deny" && disposition !== "-")
        const claimValue = parseFloat( results.data[0]["Close Amount"].trim().replace(/[$|,]/g,'') )
        const incidentMonth = new Date(results.data[0]["Incident Date"].trim()).getMonth()
        const airline = (results.data[0]["Airline Name"].trim().length > 1) ? results.data[0]["Airline Name"] : "NA"
        const airportCode = results.data[0]["Airport Name"].trim()

        $scope.claims.push({
          airline: airline,
          claim: claimValue,
          month: incidentMonth,
          airportCode: airportCode,
          validClaim: validClaim
        })


      },
      complete: function(){
        console.log("done");
      }
    })

  }

  function getClaims(){
    $http({
      method: 'GET',
      url:'src/data/claims-2010-jan-may.csv'
      // 'src/data/claims_partial.csv'
      // url: 'src/data/claims_full.csv'
    }).then(function successCallback(response) {
      streamCSV(response.data)
    }, function errorCallback(response) {
    });
  }

  $scope.getClaims = getClaims;

})