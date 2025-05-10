package com.example.HIO.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Value("${upload.dir}")
    private String uploadDir;

    @Bean
    public String uploadDirectory() {
        return uploadDir;
    }
}
