// module takes in two arguments, a name and a list of dependencies:
angular.module('App',["chart.js"])
  .controller('MainCtrl',function($scope,$http){

  $scope.currentAirline = ''
  $scope.currentAirportCode = ''

  $scope.airlines = {}
  $scope.airportCodes = {}

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
    // let count = 0;

    Papa.parse(data,{
      header: true,
      beforeFirstChunk: function(results,parser){
        console.log("BFC", results)
      },
      step: function(results,parser){
        // count += 1

        const disposition = results.data[0]["Disposition"].trim().toLowerCase()
        const validClaim = (disposition !== "deny" && disposition !== "-")
        const claimValue = parseFloat( results.data[0]["Close Amount"].trim().replace(/[$|,]/g,'') )
        const month = new Date(results.data[0]["Date Received"].trim()).getMonth()
        const airline = (results.data[0]["Airline Name"].trim().length > 1) ? results.data[0]["Airline Name"].trim() : "NA"
        const airportCode = (results.data[0]["Airport Code"].trim().length > 1) ? results.data[0]["Airport Code"].trim() : "NA"

        // Airlines hash
        if (airline !== 'NA' && !$scope.airlines[airline]){
          $scope.airlines[airline] = airline
        }

        // Airport Codes hash
        if (airportCode !== 'NA' && !$scope.airportCodes[airportCode]){
          $scope.airportCodes[airportCode] = airportCode
        }

        // Claims
        $scope.claims.push({
          airline: airline,
          claim: claimValue,
          month: month,
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