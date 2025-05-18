package com.example.HIO.controller;

import com.example.HIO.domain.model.Comment;
import com.example.HIO.domain.model.Event;
import com.example.HIO.domain.model.User;
import com.example.HIO.entity.CommentEntity;
import com.example.HIO.entity.UserEntity;
import com.example.HIO.entity.EventEntity;
import com.example.HIO.service.EventService;
import com.example.HIO.service.CommentService;
import com.example.HIO.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@CrossOrigin(allowedHeaders = "Content-type")
@PreAuthorize("isAuthenticated()")

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "cities controller", description = "")
public class CitiesController {


    private final UserService UserService;


    @Autowired
    private final EventService EventService;
    @Autowired
    private final CommentService CommentService;
    @Autowired
    private final ModelMapper mapper;



    /// ///////////////////////////////////

    //---------------------------//
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
    //---------------------------//

    /////////////////////////////
    @GetMapping(value="/cities")
    public String[] getCities(){
        return EventService.getCities();
    }

    @GetMapping(value="/cities/{city}")
    public List<Event> getEventsByCity(@PathVariable String city){
        return EventService.getEventsByCity(city).stream()
                .map(this::convertToEventDto)
                .collect(Collectors.toList());
    }


    /// //////////////////////////////////
    @GetMapping("/admin")
    @Operation(summary = "ROLE_ADMIN only")
    @PreAuthorize("hasRole('ADMIN')")
    public String mainAdmin() {
        return "Hello, admin!";
    }

    @GetMapping("/get-admin")
    @Operation(summary = "get ROLE_ADMIN status")
    public void getAdmin() {
        UserService.getAdmin();
    }
    /// //////////////////////////////
}
