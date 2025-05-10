package com.example.HIO.service;

import com.example.HIO.domain.dto.JwtAuthenticationResponse;
import com.example.HIO.domain.dto.SignInRequest;
import com.example.HIO.domain.dto.SignUpRequest;
import com.example.HIO.domain.dto.UpdateRequest;
import com.example.HIO.domain.model.Event;
import com.example.HIO.domain.model.Role;
import com.example.HIO.entity.EventEntity;
import com.example.HIO.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationResponse join(SignUpRequest request) {
        var user = UserEntity.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .city(request.getCity())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER)
                .build();

        userService.create(user);

        var jwt = jwtService.generateToken(user);
        return new JwtAuthenticationResponse(jwt);
    }

    public JwtAuthenticationResponse login(SignInRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        ));

        var user = userService
                .userDetailsService()
                .loadUserByUsername(request.getUsername());

        var jwt = jwtService.generateToken(user);
        return new JwtAuthenticationResponse(jwt);
    }

    //JwtAuthenticationResponse
    public void updateUserData(UpdateRequest request, Integer id, String username, String password, Role role, Long eventsAmount, Set<EventEntity> events) {

        var user = UserEntity.builder()
                .id(id)
                .username(username)
                .email(request.getEmail())
                .password(password)
                .about(request.getAbout())
                .city(request.getCity())
                .role(role)
                .eventsAmount(eventsAmount)
                .build();
        user.eventsPartIn=events;
        userService.save(user);
    }
}
