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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(allowedHeaders = "Content-type")
@PreAuthorize("isAuthenticated()")

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "comments controller", description = "")
public class CommentsController {

    private final com.example.HIO.service.UserService UserService;


    @Autowired
    private final com.example.HIO.service.EventService EventService;
    @Autowired
    private final com.example.HIO.service.CommentService CommentService;
    @Autowired
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

    @GetMapping("/comments/{id}")
    public Comment getCommentToEdit(@PathVariable Integer id){
        return convertToCommentDto(CommentService.findCommentById(id));
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(value="/events/{id}")
    public CommentEntity postComment(@PathVariable Integer id, @RequestBody() CommentEntity comment){
        var currentUser=UserService.getCurrentUser();
        comment.setCreatorId(currentUser.getId());
        comment.setCreatorName(currentUser.getUsername());
        comment.setEventId(id);
        CommentService.addComment(comment);
        return comment;
    }

    @PatchMapping("/events/{id}")
    public void editComment(@PathVariable Integer id, @RequestBody Comment comment){
        System.out.println(comment.getData());
        var commentEntity = convertToCommentEntity(comment);
        CommentService.updateComments(comment.getCommentId(), commentEntity);
    }

    @DeleteMapping("/comments/{id}")
    void deleteComment(@PathVariable Integer id){
        CommentService.removeCommentById(id);
    }

}
