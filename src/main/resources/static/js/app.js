/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = angular.module('app', ['ngCookies']);
app.controller('RegController', ['$scope', '$http', '$location', '$window', '$cookies', function ($scope, $http, $location, $window, $cookies) {

        $scope.create = function () {
            var url = "http://localhost:8090/customers/create/";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };


            $http.post(url, $scope.cust, config).then(function () {

                if ($scope.cust.password === $scope.cust.conf) {
                    alert("Customer successfully registered!!");
                    $cookies.put("name", $scope.cust.name);
                    $cookies.put("email", $scope.cust.email);
                    $cookies.put("username", $scope.cust.username);

                    $window.location.href = "http://localhost:8090/test";
                } else {
                    alert("The two passwords do not match!");
                    $scope.cust.password = "";
                    $scope.cust.conf = "";
                }
            }, function () {
                alert("Failed ");
            });
        };

        $scope.viewData = function () {
            $scope.name = $cookies.get("name");
            $scope.email = $cookies.get("email");
            $scope.username = $cookies.get("username");
            $scope.displayName = $scope.name + "" + $scope.username;
        };

        $scope.createprofile = function () {
            var url = "http://localhost:8090/profile/create/";

            $scope.name = $cookies.get("name");
            $scope.email = $cookies.get("email");
            $scope.username = $cookies.get("username");
            $scope.displayName = $scope.name + "" + $scope.username;

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };

            $scope.profile = {
                displayName: $scope.displayName,
                name: $scope.name,
                email: $scope.email,
                username: $scope.username,
                gender: $scope.pro.gender,
                dateofbirth: $scope.pro.dateofbirth
            };

            $http.post(url, $scope.profile, config).then(function () {
                alert("Profile successfully created!!");
                //$window.location.href = "http://localhost:8090/profile/";
            }, function () {
                alert("Failed ");
            });
        };
    }]);
app.controller('ProfileController', ['$scope', '$http', '$location', '$window', '$cookies', function ($scope, $http, $location, $window, $cookies) {

        $scope.viewData = function () {
            $scope.name = $cookies.get("name");
            $scope.email = $cookies.get("email");
            $scope.username = $cookies.get("username");
            $scope.displayName = $scope.name + "" + $scope.username;
        };

        $scope.create = function () {
            var url = "http://localhost:8090/profile/create/";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };



            $http.post(url, $scope.pro, config).then(function () {

                alert("Profile successfully created!!");

                //$window.location.href = "http://localhost:8090/profile/";

            }, function () {
                alert("Failed ");
            });
        };
    }]);


app.controller('LoginController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
        var user;

        $scope.loginCust = function () {
            var url = "http://localhost:8090/customers/login/";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };


            $http.post(url, $scope.cust, config).then(function (response) {

                $scope.customerData = response.data;

                if ($scope.customerData.username === null) {
                    alert("Incorrect Username or password");
                } else {
                    alert("Successfully logged in as " + $scope.customerData.name);
                    $window.location.href = "http://localhost:8090/";
                }

            }, function (response) {
                alert(response.toString() + "Failed");
                alert($scope.cust.username + " " + $scope.cust.password);
            });
        };
    }]);



app.controller('AdminController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {

        $scope.loginAdmin = function () {
            var url = "http://localhost:8090/admin/login/";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };


            $http.post(url, $scope.admin, config).then(function (response) {

                $scope.customerData = response.data;

                if ($scope.customerData.username === null) {
                    alert("Incorrect Username or password");
                } else {
                    alert("Successfully logged in!!");
                    $window.location.href = "http://localhost:8090/stock";
                }

            }, function (response) {
                alert(response.toString() + "Failed");
            });
        };
    }]);
app.controller('AdminCarController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {

        $scope.loginCarAdmin = function () {
            var url = "http://localhost:8090/cars/login/";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };


            $http.post(url, $scope.car, config).then(function (response) {

                $scope.carsData = response.data;

                if ($scope.carsData.username === null) {
                    alert("Incorrect Username or password");
                } else {
                    alert("Successfully logged in!!");
                    $window.location.href = "http://localhost:8090/cars";
                }

            }, function (response) {
                alert(response.toString() + "Failed");
            });
        };
    }]);
app.controller('StockController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {

        $scope.selectedUploadFile;
        $scope.uploadFile = function () {
            //get Stock number
            var formData = new FormData();
            formData.append('file', $scope.selectedUploadFile);
            formData.append('description', $scope.stock.description);
            formData.append('category', $scope.stock.category);
            formData.append('price', $scope.stock.price);
            formData.append('name', $scope.stock.name);

            $http.post('http://localhost:8090/shop/products/', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function () {
                alert("Success");
            }, function () {
                alert("Image size too large!!");
            });
        };
    }]);
app.controller('GetStockController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {

        $scope.getfunction = function () {
            var url = "http://localhost:8090/admin/stock/";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };


            $http.get(url, config).then(function (response) {
                $scope.response = response.data;
            }, function (response) {
                $scope.getResultMessage = "Fail!";
                alert(getResultMessage);
            });
        };

        var prod = {};
        prod = {
            description: $scope.description,
            price: $scope.price,
            quantity: 1
        };




    }]);


app.controller('FetchStockController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {

        $scope.getfunction = function () {
            var url = "http://localhost:8090/admin/stock/";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };


            $http.get(url, config).then(function (response) {
                $scope.products = response.data;
            }, function (response) {
                $scope.getResultMessage = "Fail!";
                alert(getResultMessage);
            });
        };

        $scope.deletefromstock = function (stock) {

            var url = "http://localhost:8090/admin/delete/";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };

            $http.post(url, stock, config).then(function (response) {
                alert(stock.name + " removed from stock!");
            }, function () {
                alert("Failed to remove product!");
            });
        };
        
        $scope.updateStock = function () {

            $scope.show = true;
        };
        
         $scope.updateS = function (stock) {
            var url = "http://localhost:8090/product/update";

            $scope.product = {
                id: stock.id,
                name: stock.name,
                description: stock.description,
                category: stock.category,
                price: stock.price,
                image: stock.image
                
            };
            
            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };
            
            $http.post(url, $scope.product, config).then(function (response) {
                alert("Updated!!");
            }, function (response) {
                alert("Failed!!");
            });
        };

    }]);
app.controller('CarController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {

        $scope.selectedUploadFile;
        $scope.uploadFile = function () {
            //get Car number
            var formData = new FormData();
            formData.append('file', $scope.selectedUploadFile);
            formData.append('year', $scope.car.year);
            formData.append('price', $scope.car.price);
            formData.append('name', $scope.car.name);

            $http.post('http://localhost:8090/car/add/', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function () {
                alert("Success");
            }, function () {
                alert("Image size too large!!");
            });
        };
    }]);
app.controller('GetCarController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {

        $scope.getfunction = function () {
            var url = "http://localhost:8090/cars/car/";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };


            $http.get(url, config).then(function (response) {
                $scope.response = response.data;
            }, function (response) {
                $scope.getResultMessage = "Fail!";
                alert(getResultMessage);
            });
        };

        var prod = {};
        prod = {
            year: $scope.year,
            price: $scope.price,
            quantity: 1
        };




    }]);


app.controller('FetchCarController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {

        $scope.getfunction = function () {
            var url = "http://localhost:8090/cars/car/";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };


            $http.get(url, config).then(function (response) {
                $scope.car = response.data;
            }, function (response) {
                $scope.getResultMessage = "Fail!";
                alert(getResultMessage);
            });
        };

        $scope.deletefromcar = function (car) {

            var url = "http://localhost:8090/car/delete/";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };

            $http.post(url, car, config).then(function (response) {
                alert(car.name + " removed from car!");
            }, function () {
                alert("Failed to remove car!");
            });
        };
         $scope.updateCar = function () {

            $scope.show = true;
        };
        
         $scope.updateC = function (car) {
            var url = "http://localhost:8090/car/update";

            $scope.car = {
                id: car.id,
                name: car.name,
                year: car.year,
                price: car.price,
                image: car.image
                
            };
            
            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };
            
            $http.post(url, $scope.car, config).then(function (response) {
                alert("Updated!!");
            }, function (response) {
                alert("Failed!!");
            });
        };

    }]);


app.controller('GetCustomersController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {

        var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        };

        $scope.getAllOrders = function () {
            var url = "http://localhost:8090/orders/";


            $http.get(url, config).then(function (response) {
                $scope.customers = response.data;
            }, function (response) {
                $scope.getResultMessage = "Failed!";
                alert(getResultMessage);
            });
        };

        $scope.getcustomerfunction = function () {
            var url = "http://localhost:8090/customers/";


            $http.get(url, config).then(function (response) {
                $scope.customers = response.data;
            }, function (response) {
                $scope.getResultMessage = "Failed!";
                alert(getResultMessage);
            });
        };

    }]);
app.directive('fileModel', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
});