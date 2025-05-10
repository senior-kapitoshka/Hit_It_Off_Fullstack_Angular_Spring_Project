package com.example.HIO.config;

import jakarta.servlet.MultipartConfigElement;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;


@Configuration
public class MultipartConfig {

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        // Создаем фабрику для конфигурации Multipart
        MultipartConfigFactory factory = new MultipartConfigFactory();
        // Указываем максимальный размер файла и запроса, используя DataSize
        factory.setMaxFileSize(DataSize.ofMegabytes(2));  // 2MB
        factory.setMaxRequestSize(DataSize.ofMegabytes(2));  // 2MB
        return factory.createMultipartConfig(); // Максимальный размер всего запроса (включая файлы)
    }
}
