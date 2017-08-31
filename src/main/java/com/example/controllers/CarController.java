/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.controllers;

import com.example.entity.Car;
import com.example.entity.Stock;
import com.example.repository.CarRepo;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author User
 */
@RestController
public class CarController {
    
    @Autowired
    private CarRepo repo;
    
    @RequestMapping(value = "/cars/car")
    public List<Car> getAllCar(){
        List<Car> car = new ArrayList<>();
        
        for(Car s : repo.findAll()){
            car.add(s);
        }
        
        return car;
    }
    
    @RequestMapping(value = "/cars/car", method = RequestMethod.POST)
    public void addCar(@RequestBody Car car){
        repo.save(car);
    }
    
    @RequestMapping(method = RequestMethod.POST, value = "/car/add")
    public @ResponseBody void addProduct(@RequestParam("file") MultipartFile file,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "year") String year,
            @RequestParam(value = "price") double price) throws IOException {
        
        byte[] image = file.getBytes();
        
        Car car = new Car(name, year, image, price);
        
        repo.save(car);
    }
    
     @RequestMapping(method = RequestMethod.POST, value = "/car/update")
    public void updateCar(@RequestBody Car car) {
        repo.save(car);
    }

    @RequestMapping(value = "/car/delete", method = RequestMethod.POST)
    public void deleteCar(@RequestBody Car car){
        repo.delete(car);
    } 
}
