// module takes in two arguments, a name and a list of dependencies:
angular.module('App',[])
  .controller('MainCtrl',function($scope){
    $scope.hello = "world";

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

    $scope.setCurrentCategory = setCurrentCategory;

  })