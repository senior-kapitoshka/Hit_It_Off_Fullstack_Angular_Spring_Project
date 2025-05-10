package com.example.HIO.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Update request")
public class UpdateRequest {

    @Schema(description = "email", example = "johndoe@gmail.com")
    @Size(min = 5, max = 255, message = "from 5 to 50")
    @NotBlank(message = "email cannot be empty")
    @Email(message = "user@example.com format")
    private String email;


    @Schema(description = "city", example = "Moscow")
    @Size(max = 255, message = "no more than 255 chars")
    private String city;

    @Schema(description = "about", example = "hello, im using whatsup")
    @Size(max = 1024, message = "no more than 1024 chars")
    private String about;
}

