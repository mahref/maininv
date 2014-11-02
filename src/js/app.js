var app = angular.module("app", ['ngRoute']).config(function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginController',
    });

    $routeProvider.when('/home', {
        templateUrl: 'home.html',
        controller: 'HomeController'
    })

    $routeProvider.otherwise({ redirectTo : '/login' });
});

app.controller('LoginController', function ($scope, $location) {
    console.log('inside login controller');
    $scope.login = function() {
        $location.path('/home');
    };
});

app.controller('HomeController', function ($scope, $location) {
    console.log('inside home controller');
})
