package com.example.HIO.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Registration request")
public class SignUpRequest {

    @Schema(description = "username", example = "John")
    @Size(min = 1, max = 50, message = "from 1 to 50")
    @NotBlank(message = "username cannot be empty")
    private String username;

    @Schema(description = "email", example = "johndoe@gmail.com")
    @Size(min = 5, max = 255, message = "from 5 to 50")
    @NotBlank(message = "email cannot be empty")
    @Email(message = "user@example.com format")
    private String email;

    @Schema(description = "password", example = "my_1secret1_password")
    @Size(max = 255, message = "no more than 255 chars")
    private String password;

    @Schema(description = "city", example = "Moscow")
    @Size(max = 255, message = "no more than 255 chars")
    private String city;
}

