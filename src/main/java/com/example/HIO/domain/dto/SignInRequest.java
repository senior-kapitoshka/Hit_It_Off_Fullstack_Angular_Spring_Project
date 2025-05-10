package com.example.HIO.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "Authentication request")
public class SignInRequest {

    @Schema(description = "username", example = "John")
    @Size(min = 1, max = 50, message = "from 1 to 50")
    @NotBlank(message = "username cannot be empty")
    private String username;

    @Schema(description = "password", example = "my_1secret1_password")
    @Size(min = 1, max = 255, message = "from 1 to 50")
    @NotBlank(message = "password cannot be empty")
    private String password;
}
