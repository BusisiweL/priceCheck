/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.controllers;

import com.example.entity.Customer;
import com.example.entity.Product;
import com.example.entity.Stock;
import com.example.repository.ProductRepository;
import com.example.service.CustomerService;
import com.example.utility.Utility;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
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
public class ProductController {


    @Autowired
    private ProductRepository repository;
    

    @RequestMapping("/shop/{id}/product/{productId}")
    public Product getProduct(@PathVariable long id) {
        //return repository.findOne(id);
        Product p = new Product();
        
        return p;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/shop/products")
    public @ResponseBody void addProduct(@RequestParam("file") MultipartFile file,
            @RequestParam(value = "description") String description,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "category") String category,
            @RequestParam(value = "price") double price) throws IOException {
        
        byte[] image = file.getBytes();
        
        Stock stock = new Stock(name, description, image, category, price);
        
        repository.save(stock);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/shop/products/total")
    public String calculateTotal() {

        double t = 0;
        for (Stock p : repository.findAll()) {
            t += p.getPrice();
        }
        DecimalFormat fm = new DecimalFormat("##.##");

        String total = fm.format(t);

        return total;
    }

   

    @RequestMapping(method = RequestMethod.POST, value = "/product/update")
    public void updateStock(@RequestBody Stock stock) {
        repository.save(stock);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/shop/product/delete")
    public void deleteProduct(@RequestBody Product id) {
        //repository.delete(id);
    }
    
}
