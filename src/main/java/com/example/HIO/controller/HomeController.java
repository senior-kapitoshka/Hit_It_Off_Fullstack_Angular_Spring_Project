package com.example.HIO.controller;

import com.example.HIO.domain.model.Event;
import com.example.HIO.domain.model.User;
import com.example.HIO.entity.EventEntity;
import com.example.HIO.entity.UserEntity;
import com.example.HIO.service.CommentService;
import com.example.HIO.service.EventService;
import com.example.HIO.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@CrossOrigin(allowedHeaders = "Content-type")
@PreAuthorize("isAuthenticated()")

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "home controller", description = "")
public class HomeController {

    private final com.example.HIO.service.UserService UserService;


    @Autowired
    private final com.example.HIO.service.EventService EventService;
    @Autowired
    private final com.example.HIO.service.CommentService CommentService;
    @Autowired
    private final ModelMapper mapper;

    private class HomePage{
        User user;
        List<Event> events;

        public HomePage(List<Event> events, User user) {
            this.events = events;
            this.user = user;
        }

        public List<Event> getEvents() {
            return events;
        }

        public void setEvents(List<Event> events) {
            this.events = events;
        }

        public User getUser() {
            return user;
        }

        public void setUser(User user) {
            this.user = user;
        }
    }

    //--------------------------------------------
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

    @GetMapping(value="/home")
    public HomePage getCurrentUser(){
        return new HomePage(getUserEvents(),
                convertToUserDto(UserService.getCurrentUser()));
    }


    @GetMapping(value="/home/my-events")
    public List<Event> getUserEvents(){

        Instant now = Instant.now();

        var filteredEvents = StreamSupport.stream(UserService.getCurrentUser()
                        .getEventsPartIn().spliterator(), false)
                .filter(event -> {
                    try {
                        Instant eventInstant = Instant.parse(event.getEventDate());
                        return !eventInstant.isBefore(now);
                    } catch (DateTimeParseException e) {
                        return false;
                    }
                })
                .collect(Collectors.toList());

        return filteredEvents.stream()
                .map(this::convertToEventDto)
                .collect(Collectors.toList());
    }
}
