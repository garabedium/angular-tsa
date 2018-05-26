// module takes in two arguments, a name and a list of dependencies:
angular.module('App',[])
  .controller('MainCtrl',function($scope,$http){

  $scope.hello = "world";

  $scope.presidents = [];
  $scope.claims = [];

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

  function parseCSV(data){

  }

  function getClaims(){
    $http({
      method: 'GET',
      url: 'src/data/claims_partial.csv'
    }).then(function successCallback(response) {
      let csvData = Papa.parse(response.data)
          $scope.claims = csvData.data
      debugger
    }, function errorCallback(response) {
    });
  }

  $scope.setCurrentCategory = setCurrentCategory;
  $scope.isCurrentCategory = isCurrentCategory;
  $scope.getPresidents = getPresidents;
  $scope.hasPresidents = hasPresidents;
  $scope.getClaims = getClaims;



})