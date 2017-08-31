/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.home;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * @author User
 */
@Controller
public class MainController {

    @GetMapping("/")
    private String indexHome() {
        return "index";
    }

    @GetMapping("/register")
    private String registerCustomer() {
        return "register";
    }

    @GetMapping("/login")
    private String loginCustomer() {
        return "login";
    }
    @GetMapping("/admin")
    private String admin() {
        return "admin";
    }

    @GetMapping("/stock")
    private String addStock() {
        return "addStock";
    }

    @GetMapping("/allProducts")
    private String getAllProducts() {
        return "allProducts";
    }

    @GetMapping("/viewMoreLogin")
    private String getViewMoreLogin() {
        return "viewMoreLogin";
    }

    @GetMapping("/getStock")
    private String getStockPage() {
        return "myStock";
    }

    @GetMapping("/getCustomers")
    private String getPageCustomers() {
        return "allCustomers";
    }
    
    @GetMapping("/profile")
    private String getProfile() {
        return "Profile";
    }
    
    @GetMapping("/test")
    private String getTest() {
        return "test";
    }
     @GetMapping("/car")
    private String getCar() {
        return "Car";
    }
     @GetMapping("/cars")
    private String cars() {
        return "addCar";
    }
    
    @GetMapping("/viewcar")
    private String viewcar() {
        return "ViewCar";
    }
    @GetMapping("/getCar")
    private String getCarPage() {
        return "myCars";
    }
}
