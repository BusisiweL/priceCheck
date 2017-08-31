/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.controllers;


import com.example.entity.CarS;
import com.example.entity.Customer;

import com.example.repository.CarSRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author User
 */
@RestController
public class CarSController {
    @Autowired
    private CarSRepo repo;
    
    
    
    @RequestMapping(value = "/cars/login", method = RequestMethod.POST)
    public CarS carsLogin(@RequestBody CarS a){
        CarS cars = new CarS();
        
        for(CarS  ad : repo.findAll()){
            if(ad.getUsername().equals(a.getUsername()) && ad.getPassword().equals(a.getPassword())){
                cars = ad;
            }
        }
        
        return cars;
    }
    
}
