package com.example.HIO.controller;

import com.example.HIO.domain.dto.JwtAuthenticationResponse;
import com.example.HIO.domain.dto.SignInRequest;
import com.example.HIO.domain.dto.SignUpRequest;
import com.example.HIO.domain.dto.UpdateRequest;
import com.example.HIO.domain.model.Event;
import com.example.HIO.domain.model.User;
import com.example.HIO.entity.EventEntity;
import com.example.HIO.entity.UserEntity;
import com.example.HIO.service.AuthenticationService;
import com.example.HIO.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthController {
    private final AuthenticationService authenticationService;
    private final com.example.HIO.service.UserService userService;
    private Event convertToEventDto(EventEntity entity) {
        return mapper.map(entity, Event.class);
    }

    private EventEntity convertToEventEntity(Event dto) {
        return mapper.map(dto, EventEntity.class);
    }

    private User convertToUserDto(UserEntity entity) {
        return mapper.map(entity, User.class);
    }

    private UserEntity convertToUserEntity(User dto) {
        return mapper.map(dto, UserEntity.class);
    }

    @Autowired
    private final ModelMapper mapper;

    @Operation(summary = "Registration")
    @PostMapping("/join")
    public JwtAuthenticationResponse signUp(@RequestBody @Valid SignUpRequest request) {
        return authenticationService.join(request);
    }

    @PreAuthorize("permitAll()")
    @Operation(summary = "Authorization")
    @PostMapping("/login")
    public JwtAuthenticationResponse signIn(@RequestBody @Valid SignInRequest loginRequest) {

        return authenticationService.login(loginRequest);
    }

    @GetMapping("/api/settings")
    public User getCurrentUserToEdit(){
        return convertToUserDto(userService.getCurrentUser());
    }

    @PutMapping("/api/settings")
    //JwtAuthenticationResponse
    public void update(@RequestBody @Valid UpdateRequest request) {
        var role= userService.getCurrentUser().getRole();
        var id= userService.getCurrentUser().getId();
        var username= userService.getCurrentUser().getUsername();
        var password= userService.getCurrentUser().getPassword();
        var eventsAmount= userService.getCurrentUser().getEventsAmount();
        var events= userService.getCurrentUser().eventsPartIn;
        authenticationService.updateUserData(request,id,username,password,role,eventsAmount,events);
        //return authenticationService.updateUserData(request,id,role);
    }
    @GetMapping("/admin")
    @Operation(summary = "ROLE_ADMIN only")
    @PreAuthorize("hasRole('ADMIN')")
    public String mainAdmin() {
        return "Hello, admin!";
    }

    @GetMapping("/get-admin")
    @Operation(summary = "get ROLE_ADMIN status")
    public void getAdmin() {
        userService.getAdmin();
    }

}
