/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.controllers;

import com.example.entity.Customer;
import com.example.entity.Profile;
import com.example.repository.ProfileRepo;
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
public class ProfileController {

    @Autowired
    private ProfileRepo repository;

    
    @RequestMapping(method = RequestMethod.POST, value = "/profile/create")
    public void addPerson(@RequestBody Profile profile){
        repository.save(profile);
    }

}
