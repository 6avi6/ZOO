package com.polsl.tab.zoobackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, Docker!!!!!";
    }

    @GetMapping("/hello/Veterinarian")
    public String helloVeterinarian() {
        return "Hello, Veterinarian!!!!!";
    }

    @GetMapping("/hello/Registrar")
    public String helloRegistrar() {
        return "Hello, Registrar!!!!!";
    }

    @GetMapping("/hello/Caregiver")
    public String helloCaregiver() {
        return "Hello, Caregiver!!!!!";
    }

    @GetMapping("/hello/Director")
    public String helloDirector() {
        return "Hello, Director!!!!!";
    }

    @GetMapping("/hello/Admin")
    public String helloAdmin() {
        return "Hello, Admin!!!!!";
    }

    @GetMapping("/hello/VeterinarianCaregiver")
    public String helloVeterinarianCaregiver() {
        return "Hello, Veterinarian and Caregiver!!!!!";
    }
}
