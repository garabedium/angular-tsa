angular.module('App',["chart.js"])
  .controller('MainCtrl',function($scope,$http){

  $scope.init = () => {
    $http({
      method: 'GET',
      url: 'src/data/claims_full.csv'
    }).then(function successCallback(response) {
      streamCSV(response.data)
    }, function errorCallback(response) {
    });
  }

  $scope.currentAirline = null
  $scope.currentAirportCode = null
  $scope.airlines = []
  $scope.airportCodes = []
  $scope.claims = []

  const months = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"]

  $scope.lineLabels = months
  $scope.lineSeries = ['Claims Losses']
  $scope.lineData = []

  const setAirlineLossesChart = () => {
    const data = $scope.airlines.filter((airline) => { return airline.id === $scope.currentAirline })[0].monthlyLosses
    return $scope.lineData.push(data)
  }

  const setCurrentAirline = (id) => {
    return $scope.currentAirline = id
  }

  const calculateMonthlyAirlineLosess = () => {
    let calcMonthlyLoss = (airline) => {
      let monthlyLosses = []
      months.forEach( (month,index) => {
        let monthlyClaims = $scope.claims.filter( (claim) => { return claim.airline === airline && claim.month === index && claim.validClaim === true })
        let monthlyClaimValues = monthlyClaims.reduce( (total,claim) => { return total + claim.claim }, 0)
        monthlyLosses.push(monthlyClaimValues)
      })
      return monthlyLosses
    }

    $scope.airlines.forEach( (airline,index) => {
      const monthlyLosses = calcMonthlyLoss(airline.name)
      $scope.airlines[index].monthlyLosses = monthlyLosses
    })
  }

  const streamCSV = (data) => {
    Papa.parse(data,{
      header: true,
      step: function(results,parser){

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
        calculateMonthlyAirlineLosess()
        setAirlineLossesChart()
      }
    })
  }

  $scope.setCurrentAirline = setCurrentAirline;
  // $scope.calculateMonthlyAirlineLosess = calculateMonthlyAirlineLosess;
  // $scope.setAirlineLossesChart = setAirlineLossesChart;

})