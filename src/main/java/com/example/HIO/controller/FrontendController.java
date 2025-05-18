package com.example.HIO.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {
    // Обработка всех других путей
    @RequestMapping(value = {"/{path:[^\\.]*}"
            ,"/events/**"
            ,"/home/**",
            "/cities/**",
            "/settings"
    })
    public String handleOtherPaths() {
        return "forward:/index.html";
    }


}



