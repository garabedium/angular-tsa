// module takes in two arguments, a name and a list of dependencies:
angular.module('App',["chart.js"])
  .controller('MainCtrl',function($scope,$http){

  $scope.init = () => {
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

  $scope.currentAirline = null
  $scope.currentAirportCode = null

  $scope.airlines = []
  $scope.airportCodes = []

  const months = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"]
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

  $scope.setCurrentAirline = (id) => {
    return $scope.currentAirline = id
  }

  $scope.getMonthlyAirlineLosess = () => {
    let results = []
    // Using the currentAirline
    // Get the total monthly losses

    // for each month, filter claims by validClaim (true)
    // reduce claim value

    months.forEach( (month,index) => {

    })


  }

  function streamCSV(data){

    Papa.parse(data,{
      header: true,
      step: function(results,parser){
        // count += 1
        const disposition = results.data[0]["Disposition"].trim().toLowerCase()
        const validClaim = (disposition !== "deny" && disposition !== "-")
        const claimValue = parseFloat( results.data[0]["Close Amount"].trim().replace(/[$|,]/g,'') )
        const month = new Date(results.data[0]["Date Received"].trim()).getMonth()
        const airline = (results.data[0]["Airline Name"].trim().length > 1) ? results.data[0]["Airline Name"].trim() : "NA"
        const airportCode = (results.data[0]["Airport Code"].trim().length > 1) ? results.data[0]["Airport Code"].trim() : "NA"
        const hasAirline = $scope.airlines.filter((item) => { return item.name === airline }).length > 0
        const hasAirportCode = $scope.airportCodes.filter((item) => { return item.name === airportCode }).length > 0

        if (airline !== 'NA' && !hasAirline){
          $scope.airlines.push({
            id: $scope.airlines.length + 1,
            name: airline
          })
        }
        if (airportCode !== 'NA' && !hasAirportCode){
          $scope.airportCodes.push({
            id: $scope.airportCodes.length + 1,
            name: airportCode
          })
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
        $scope.airlines.sort( (a,b) => a.name.localeCompare(b.name) )
        $scope.setCurrentAirline($scope.airlines[0].id)
      }
    })

  }

  $scope.setCurrentAirline = setCurrentAirline;

})