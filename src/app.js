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

  const months = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"]

  $scope.currentAirline = null
  $scope.currentAirport = null
  $scope.airlines = []
  $scope.airports = []
  $scope.claims = []
  $scope.totalMonthlyAirlineLosses = {}

  // Airport line chart:
  $scope.lineLabels = months
  $scope.lineSeries = []
  $scope.lineOptions = { legend: {display: true} }
  $scope.lineData = []

  // Airport bar graph:
  $scope.barLabels = months
  $scope.barSeries = []
  $scope.barOptions = { legend: {display: true} }
  $scope.barData = []


  const setAirlineLossesChart = () => {
    const airlineLosses = $scope.airlines.filter((airline) => { return airline.id === $scope.currentAirline.id })[0].monthlyLosses
    const airlineLossAverages = Object.values($scope.totalMonthlyAirlineLosses).map( (total) => { return total / $scope.airlines.length } )

    $scope.lineData = [airlineLosses,airlineLossAverages]
    $scope.lineSeries = [$scope.currentAirline.name,'Avg. Loss (all airlines)']
  }

  const setAirportLossesChart = () => {
    const losses = $scope.airports.filter((airport) => { return airport.id === $scope.currentAirport.id })[0].monthlyLosses
    // const lossesAverage = Object.values($scope.totalMonthlyAirlineLosses).map( (total) => { return total / $scope.airlines.length } )

    $scope.barData = [losses]
    $scope.barSeries = [$scope.currentAirport.code]
  }

  const hasLineChart = () => {
    $scope.lineData.length > 0
  }

  const setCurrentAirline = (airline) => {
    $scope.currentAirline = (airline !== undefined) ? airline : $scope.airline
    if (airline === undefined){
      setAirlineLossesChart()
    }
  }

  const setCurrentAirport = (airport) => {
    $scope.currentAirport = (airport !== undefined) ? airport : $scope.airport
    if (airport === undefined){
      setAirportLossesChart()
    }
  }

  const calculateMonthlyAirportLosses = () => {
    let calcMonthlyLoss = (airport) => {
      let monthlyLosses = []

      months.forEach( (month,index) => {
        let monthlyClaims = $scope.claims.filter( (claim) => { return claim.airportCode === airport && claim.month === index && claim.validClaim === true })
        let monthlyClaimValues = monthlyClaims.reduce( (total,claim) => { return total + claim.claim }, 0)

        // if ($scope.totalMonthlyAirlineLosses[index]){
        //   $scope.totalMonthlyAirlineLosses[index] += monthlyClaimValues
        // } else {
        //   $scope.totalMonthlyAirlineLosses[index] = monthlyClaimValues
        // }

        monthlyLosses.push(monthlyClaimValues)
      })

      return monthlyLosses
    }

    $scope.airports.forEach( (airport,index) => {
      const monthlyLosses = calcMonthlyLoss(airport.code)
      $scope.airports[index].monthlyLosses = monthlyLosses
    })
  }

  const calculateMonthlyAirlineLosess = () => {
    let calcMonthlyLoss = (airline) => {
      let monthlyLosses = []

      months.forEach( (month,index) => {
        let monthlyClaims = $scope.claims.filter( (claim) => { return claim.airline === airline && claim.month === index && claim.validClaim === true })
        let monthlyClaimValues = monthlyClaims.reduce( (total,claim) => { return total + claim.claim }, 0)

        if ($scope.totalMonthlyAirlineLosses[index]){
          $scope.totalMonthlyAirlineLosses[index] += monthlyClaimValues
        } else {
          $scope.totalMonthlyAirlineLosses[index] = monthlyClaimValues
        }

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
        const airportName = (results.data[0]["Airport Name"].trim().length > 1) ? results.data[0]["Airport Name"].trim() : "NA"
        const hasAirline = $scope.airlines.filter((item) => { return item.name === airline }).length > 0
        const hasAirportCode = $scope.airports.filter((item) => { return item.code === airportCode }).length > 0

        if (airline !== 'NA' && !hasAirline){
          $scope.airlines.push({
            id: $scope.airlines.length + 1,
            name: airline
          })
        }

        if (airportCode !== 'NA' && !hasAirportCode){
          $scope.airports.push({
            id: $scope.airports.length + 1,
            name: airportName,
            code: airportCode
          })
        }

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
        $scope.airports.sort( (a,b) => a.code.localeCompare(b.code) )
        $scope.setCurrentAirline($scope.airlines[0])
        calculateMonthlyAirlineLosess()
        setAirlineLossesChart()

        // Crunch bar graph data
        // Do this when tab is clicked
        $scope.setCurrentAirport($scope.airports[0])
        calculateMonthlyAirportLosses()
        setAirportLossesChart()

      }
    })
  }

  $scope.setCurrentAirline = setCurrentAirline;
  $scope.setCurrentAirport = setCurrentAirport;
  $scope.hasLineChart = hasLineChart

})