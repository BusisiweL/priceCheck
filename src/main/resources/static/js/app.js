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
                    $window.location.href = "http://localhost:8090/allProducts";
                }

            }, function (response) {
                alert(response.toString() + "Failed");
                alert($scope.cust.username + " " + $scope.cust.password);
            });
        };
    }]);

app.controller('ShopController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

        $scope.addToCart = function () {
            var url = "http://localhost:8090/shop/products/";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };


            $http.post(url, $scope.prod, config).then(function (response) {
                alert($scope.prod.description + " added to cart!");
            }, function (response) {
                alert(response.toString() + "Failed");
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

app.controller('StockController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
        
        $scope.selectedUploadFile;
        $scope.uploadFile = function () {
            //get Stock number
            var formData = new FormData();
            formData.append('file', $scope.selectedUploadFile);
            formData.append('description', $scope.stock.description);
            formData.append('category', $scope.stock.category);
            formData.append('price', $scope.stock.price);
     
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

app.controller('GetCartController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {

        var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        };
        $scope.total = function () {
            var url = "http://localhost:8090/shop/products/total";

            $http.get(url, config).then(function (response) {
                $scope.totalPrice = response.data;

            }, function (response) {
                $scope.getResultMessage = "Fail!";
                alert(getResultMessage);
            });
        };

        $scope.getcartfunction = function () {
            var url = "http://localhost:8090/shop/products/";

            $http.get(url, config).then(function (response) {
                $scope.products = response.data;

            }, function (response) {
                $scope.getResultMessage = "Fail!";
                alert(getResultMessage);
            });
        };

        $scope.updatequantity = function (cart) {
            var url = "http://localhost:8090/product/update/";

            $http.post(url, cart, config).then(function (response) {
                $scope.cartUpdate = response.data;
                alert("Sent");
                $window.location.href = "http://localhost:8090/update";
            }, function (response) {
                $scope.getResultMessage = "Failed!";
                alert(getResultMessage);
            });

            var url1 = "http://localhost:8090/shop/product/update1/";
            $http.post(url1, quantity, config).then(function (response) {

                alert("Quantity sent!");
            }, function (response) {
                $scope.getResultMessage = "Failed!";
                alert(getResultMessage);
            });
        };
    }]);
app.controller('PlaceOrder', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
        var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        };


        $scope.customer = {
            id: id,
            name: name,
            address: address,
            email: email,
            number: number,
            username: username,
            password: password
        };

        $scope.sendCustomer = function () {
            var url = "http://localhost:8090/address/add/";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };

            $http.post(url, $scope.customer, config).then(function () {
                alert("Delivery address successfully added!");
                $window.location.href = "http://localhost:8090/thank";

            }, function () {
                alert("Failed");
            });
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
                alert(stock.description + " removed from stock!");
            }, function () {
                alert("Failed to remove product!");
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