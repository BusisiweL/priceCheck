/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = angular.module('app', ['ngCookies']);
app.controller('RegController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {

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
                    $window.location.href = "http://localhost:8090/shop";
                } else {
                    alert("The two passwords do not match!");
                    $scope.cust.password = "";
                    $scope.cust.conf = "";
                }
            }, function () {
                alert("Failed ");
            });
        };
    }]);

app.controller('LoginController', ['$scope', '$http', '$location', '$window', '$cookies', function ($scope, $http, $location, $window, $cookies) {
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
                    
                    $cookies.put("id", $scope.customerData.id);
                    $cookies.put("name", $scope.customerData.name);
                    $cookies.put("email", $scope.customerData.email);
                    $cookies.put("number", $scope.customerData.number);
                    $cookies.put("username", $scope.customerData.username);
                    $cookies.put("password", $scope.customerData.password);
                    
                    
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

        $scope.addStock = function () {
            var url = "http://localhost:8090/admin/stock/";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };


            $http.post(url, $scope.stock, config).then(function () {
                alert($scope.stock.description + " added as stock");

            }, function () {
                alert("Failed ");
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

        $scope.addToCart = function (product) {
            var url = "http://localhost:8090/shop/products/";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };

            $http.post(url, product, config).then(function (response) {
                alert(product.description + " added to cart!");
            }, function (response) {
                alert(angular.toJson(response) + "Failed");
            });
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
        $scope.proceedCheckout = function () {
            $window.location.href = "http://localhost:8090/addess";
        };
        $scope.deletefromcart = function (cart) {
            var url = "http://localhost:8090/shop/product/delete/";

            $http.post(url, cart, config).then(function (response) {

                alert("Product removed!");
            }, function (response) {
                $scope.getResultMessage = "Failed!";
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
app.controller('PlaceOrder', ['$scope', '$http', '$location', '$window', '$cookies', function ($scope, $http, $location, $window, $cookies) {
        var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        };
        
        var id = $cookies.get("id");
        var name = $cookies.get("name");
        var address = $cookies.get("address");
        var email = $cookies.get("email");
        var number = $cookies.get("number");
        var username = $cookies.get("username");
        var password = $cookies.get("password");
        
        $scope.customer = {
            id: id, 
            name: name,
            address: address,
            email: email,
            number: number,
            username: username,
            password: password
        };
        
        $scope.sendCustomer = function(){
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

app.controller('DAddressCtrl', ['$scope', '$http', '$location', '$window', '$cookies', function ($scope, $http, $location, $window, $cookies) {

        $scope.addAdress = function () {
            var url = "http://localhost:8090/address/add/";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };

            var id = $cookies.get("id");
            
            

            $scope.address = {
                city: $scope.d.city,
                suburb: $scope.d.suburb,
                street: $scope.d.street,
                snumber: $scope.d.snumber,
                bname: $scope.d.bname,
                unumber: $scope.d.unumber,
                custID: id
            };

            $http.post(url, $scope.address, config).then(function () {
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

app.controller('LoggedInController', ['$scope', '$http', '$location', '$window', '$cookies', function ($scope, $http, $location, $window, $cookies) {



        $scope.getLoggedInUser = function () {
            $scope.name = $cookies.get("name");
            $scope.email = $cookies.get("email");
            $scope.number = $cookies.get("number");
        };

        //$window.location.href = "http://localhost:8090/address/";
    }]);

app.controller('Direction', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {



        $scope.getDirection = function () {
            $window.location.href = "http://localhost:8090/addess/";
        };

    }]);