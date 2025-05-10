package com.example.HIO.controller;

import com.example.HIO.domain.dto.JwtAuthenticationResponse;
import com.example.HIO.domain.dto.SignInRequest;
import com.example.HIO.domain.dto.SignUpRequest;
import com.example.HIO.domain.dto.UpdateRequest;
import com.example.HIO.service.AuthenticationService;
import com.example.HIO.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthController {
    private final AuthenticationService authenticationService;
    private final com.example.HIO.service.UserService userService;

    @Operation(summary = "Registration")
    @PostMapping("/join")
    public JwtAuthenticationResponse signUp(@RequestBody @Valid SignUpRequest request) {
        return authenticationService.join(request);
    }

    @Operation(summary = "Authorization")
    @PostMapping("/login")
    public JwtAuthenticationResponse signIn(@RequestBody @Valid SignInRequest request) {
        return authenticationService.login(request);
    }
    @PutMapping("/home/settings")
    //JwtAuthenticationResponse
    public void update(@RequestBody @Valid UpdateRequest request) {
        //написать проверку какие поля отличаются?
        var role= userService.getCurrentUser().getRole();
        var id= userService.getCurrentUser().getId();
        var username= userService.getCurrentUser().getUsername();
        var password= userService.getCurrentUser().getPassword();
        var eventsAmount= userService.getCurrentUser().getEventsAmount();
        var events= userService.getCurrentUser().eventsPartIn;
        authenticationService.updateUserData(request,id,username,password,role,eventsAmount,events);
        //return authenticationService.updateUserData(request,id,role);
    }

}
