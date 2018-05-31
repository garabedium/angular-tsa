  const calculateMonthlyAirportLosess = () => {
    let calcMonthlyLoss = (airport) => {
      let monthlyLosses = []

      months.forEach( (month,index) => {
        let monthlyClaims = $scope.claims.filter( (claim) => { return claim.airport === airport && claim.month === index && claim.validClaim === true })
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