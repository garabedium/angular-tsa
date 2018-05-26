// module takes in two arguments, a name and a list of dependencies:
angular.module('App',["chart.js"])
  .controller('MainCtrl',function($scope,$http){

  $scope.hello = "world";
  $scope.presidents = [];
  $scope.claims = [];



  $scope.pieLabels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.pieData = [300, 500, 100];

  $scope.categories = [
    {"id": 0, "name": "Development"},
    {"id": 1, "name": "Design"},
    {"id": 2, "name": "Exercise"},
    {"id": 3, "name": "Humor"}
  ];

  $scope.bookmarks = [
    {"id": 0, "title": "AngularJS", "url":"http://angularjs.org", "category":"Development"},
    {"id": 1, "title": "React", "url":"http://react.org", "category":"Development"},
    {"id": 2, "title": "Vue", "url":"http://vuejs.org", "category":"Development"},
    {"id": 3, "title": "New Yorker", "url":"http://newyorker.org", "category":"Humor"},
    {"id": 4, "title": "Dilbert", "url":"http://dilbert.org", "category":"Humor"},
    {"id": 5, "title": "Men's Health", "url":"http://menshealth.org", "category":"Exercise"}
  ];

  $scope.currentCategory = null;

  function setCurrentCategory(category){
    $scope.currentCategory = category;
  }

  function isCurrentCategory(category){
    return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
  }

  function hasPresidents(){
    return $scope.presidents.length > 0
  }

  function getPresidents(){
    $http({
      method: 'GET',
      url: 'src/data/presidents.json'
    }).then(function successCallback(response) {
      $scope.presidents = response.data;
    }, function errorCallback(response) {
    });
  }

  function streamCSV(data){
    Papa.parse(data,{
      header: true,
      step: function(results,parser){
        console.log("row data: ", results.data[0]);
      },
      complete: function(){
        console.log("done");
      }
    })
  }

  function getClaims(){
    $http({
      method: 'GET',
      url: 'src/data/claims_partial.csv'
      // url: 'src/data/claims_full.csv'
    }).then(function successCallback(response) {
      streamCSV(response.data)
    }, function errorCallback(response) {
    });
  }

  $scope.setCurrentCategory = setCurrentCategory;
  $scope.isCurrentCategory = isCurrentCategory;
  $scope.getPresidents = getPresidents;
  $scope.hasPresidents = hasPresidents;
  $scope.getClaims = getClaims;

})