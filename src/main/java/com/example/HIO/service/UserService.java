package com.example.HIO.service;

import com.example.HIO.domain.model.Role;
import com.example.HIO.entity.EventEntity;
import com.example.HIO.entity.UserEntity;
import com.example.HIO.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;

    public Iterable<UserEntity> findUsers() {
        return repository.findAll();
    }
    public void save(UserEntity userEntity) {

         repository.save(userEntity);
    }

    public void create(UserEntity userEntity) {
        if (repository.existsByUsername(userEntity.getUsername())) {
            throw new RuntimeException("username error");
        }

        if (repository.existsByEmail(userEntity.getEmail())) {
            throw new RuntimeException("email error");
        }

        save(userEntity);
    }

    public  UserEntity getByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));

    }

    public UserDetailsService userDetailsService() {
        return this::getByUsername;
    }


    public UserEntity getCurrentUser() {
        var username = SecurityContextHolder.getContext().getAuthentication().getName();
        return getByUsername(username);
    }

    public void updateUsers(Integer id, UserEntity user) {
        save(user);
    }


    public void removeUserById(Integer id) {
        repository.deleteById(id);
    }
    @Deprecated
    public void getAdmin() {
        var user = getCurrentUser();
        user.setRole(Role.ROLE_ADMIN);
        save(user);
    }
}
