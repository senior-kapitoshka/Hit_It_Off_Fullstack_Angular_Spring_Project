package com.example.HIO.controller;

import com.example.HIO.domain.model.Comment;
import com.example.HIO.domain.model.Event;
import com.example.HIO.domain.model.User;
import com.example.HIO.entity.CommentEntity;
import com.example.HIO.entity.EventEntity;
import com.example.HIO.entity.UserEntity;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@CrossOrigin(allowedHeaders = "Content-type")
@PreAuthorize("isAuthenticated()")

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Tag(name = "cities controller", description = "")
public class UsersController {
    private final com.example.HIO.service.UserService UserService;
    private final ModelMapper mapper;

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

    private Comment convertToCommentDto(CommentEntity entity) {
        return mapper.map(entity, Comment.class);
    }

    private CommentEntity convertToCommentEntity(Comment dto) {
        return mapper.map(dto, CommentEntity.class);
    }
    //------------------------------//

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value="/users")
    public List<User> getEvents(Pageable pageable) {
        int toSkip = pageable.getPageSize() * pageable.getPageNumber();
        var usersList = StreamSupport
                .stream(UserService.findUsers().spliterator(), false)
                .skip(toSkip).limit(pageable.getPageSize())
                .collect(Collectors.toList());


        return usersList
                .stream()
                .map(this::convertToUserDto)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/users/{id}")
    void deleteEvent(@PathVariable Integer id){
        UserService.removeUserById(id);
    }

    @PatchMapping("/users/{id}")
    public void patch(@PathVariable Integer id,@RequestBody User user){
        if (!id.equals(user.getId())) throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "id does not match"
        );

        var userEntity = convertToUserEntity(user);
        UserService.updateUsers(id, userEntity);
    }

}
