const months = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"]
// const months = ["January"]
let results = []
let claims = [
  {airline: "Allegiant Air", claim: 15, month: 0, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 0, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 0, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 1, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 1, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 1, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 2, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 2, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 3, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 3, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 4, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 4, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 5, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 5, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 6, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 6, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 7, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 7, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 8, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 8, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 9, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 9, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 10, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 10, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 10, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 10, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 10, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 11, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 11, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 11, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 11, airportCode: "LAS", validClaim: true},
  {airline: "Allegiant Air", claim: 15, month: 11, airportCode: "LAS", validClaim: false},
  {airline: "Allegiant Air", claim: 15, month: 11, airportCode: "LAS", validClaim: false},
  {airline: "Allegiant Air", claim: 15, month: 11, airportCode: "LAS", validClaim: false},
  {airline: "Allegiant Air", claim: 15, month: 11, airportCode: "LAS", validClaim: false},
  {airline: "Allegiant Air", claim: 15, month: 11, airportCode: "LAS", validClaim: false},
  {airline: "Allegiant Air", claim: 15, month: 11, airportCode: "LAS", validClaim: false},
  {airline: "Allegiant Air", claim: 15, month: 11, airportCode: "LAS", validClaim: false},
  {airline: "Allegiant Air", claim: 15, month: 11, airportCode: "LAS", validClaim: false},
  {airline: "Allegiant Air", claim: 15, month: 11, airportCode: "LAS", validClaim: false},
  {airline: "Allegiant Air", claim: 15, month: 11, airportCode: "LAS", validClaim: false},
  {airline: "Allegiant Air", claim: 15, month: 11, airportCode: "LAS", validClaim: false}
]

  // for each month, filter claims by validClaim (true)
  // reduce claim value
  // push claim total to results

// let testFilter = claims.filter( (claim) => {return claim.month === 0 && claim.validClaim === true} )
// console.log(testFilter);

months.forEach( (month,index) => {
  let monthlyClaims = claims.filter( (claim) => { return claim.month === index && claim.validClaim === true })
  let monthlyClaimValues = monthlyClaims.reduce( (total,claim) => { return total + claim.claim }, 0)
  console.log(monthlyClaimValues)
  // results.push(monthlyClaimValues)
})