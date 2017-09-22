/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.repository;

import com.example.entity.ImageTest;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author reversidesoftwaresolution
 */
public interface ImageRepo extends CrudRepository<ImageTest, Long>{
    
}
