package com.example.HIO.controller;

import com.example.HIO.domain.model.Comment;
import com.example.HIO.domain.model.Event;
import com.example.HIO.domain.model.User;
import com.example.HIO.entity.CommentEntity;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import java.util.UUID;

@Slf4j
@CrossOrigin(allowedHeaders = "Content-type")
@PreAuthorize("isAuthenticated()")
@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Tag(name = "events controller", description = "")
public class EventsController {

    private final com.example.HIO.service.UserService userService;
    private final com.example.HIO.service.EventService eventService;
    private final com.example.HIO.service.CommentService commentService;
    private final ModelMapper mapper;

    @Value("${upload.dir}")
    private String uploadDir;

    // Мапперы для преобразования сущностей
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

    // Вложенный класс для отображения события с комментариями
    private class EventView {
        private Event event;
        private List<Comment> comments;
        private List<Integer> usersPartInIds;

        EventView(Event e, List<Comment> lc, List<Integer> eu) {
            this.event = e;
            this.comments = lc;
            this.usersPartInIds = eu;
        }

        public Event getEvent() {
            return event;
        }

        public List<Comment> getComments() {
            return comments;
        }

        public List<Integer> getUsersPartInIds() {
            return usersPartInIds;
        }
    }

    // Обработка добавления события с изображением
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(value = "/events/form")
    public ResponseEntity<EventEntity> postEventWithImage(
            @RequestPart("event") EventEntity event,
            @RequestPart(value = "eventImg", required = false) MultipartFile imageFile) {

        // Получаем текущего пользователя
        var currentUser = userService.getCurrentUser();
        event.getUsersPartIn().add(currentUser);
        currentUser.getEventsPartIn().add(event);
        currentUser.setEventsAmount(currentUser.getEventsAmount() + 1);

        // Сохраняем событие с изображением
        EventEntity savedEvent = eventService.addEvent(event, imageFile);

        return ResponseEntity.ok(savedEvent);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "/events")
    public List<Event> getEvents(Pageable pageable) {
        int toSkip = pageable.getPageSize() * pageable.getPageNumber();
        var eventsList = StreamSupport
                .stream(eventService.findEvents().spliterator(), false)
                .skip(toSkip).limit(pageable.getPageSize())
                .collect(Collectors.toList());

        return eventsList
                .stream()
                .map(this::convertToEventDto)
                .collect(Collectors.toList());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/events/{id}")
    public EventView getEventById(@PathVariable Integer id, Pageable pageable) {
        int toSkip = pageable.getPageSize() * pageable.getPageNumber();
        var commentsList = StreamSupport
                .stream(commentService.findCommentsByEventId(id).spliterator(), false)
                .skip(toSkip).limit(pageable.getPageSize())
                .collect(Collectors.toList());
        var event = eventService.findEventById(id);
        var eventsUsers = event.getUsersPartIn();
        List<Integer> usersPartInIds = eventsUsers.stream().map(u -> u.getId()).collect(Collectors.toList());
        return new EventView(convertToEventDto(event), commentsList
                .stream()
                .map(this::convertToCommentDto)
                .collect(Collectors.toList()), usersPartInIds);
    }

    @DeleteMapping("/events/{id}/edit")
    void deleteEvent(@PathVariable Integer id) {
        var event = eventService.findEventById(id);
        var usersPartIn = event.getUsersPartIn();
        usersPartIn.forEach(user -> user.getEventsPartIn().clear());
        event.getUsersPartIn().clear();
        eventService.removeEventById(id);
    }

    @GetMapping("/events/{id}/edit")
    public Event getEventToEdit(@PathVariable Integer id) {
        return convertToEventDto(eventService.findEventById(id));
    }

    /*@PutMapping("/events/{id}/edit")
    public void putEvent(@PathVariable Integer id, @RequestBody Event event) {
        if (!id.equals(event.getId())) throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "id does not match"
        );

        var eventEntity = convertToEventEntity(event);
        eventService.updateEvents(id, eventEntity);
    }*/

    @PutMapping("/events/{id}/edit")
    public void updateEvent(@PathVariable Integer id,
                            @RequestPart("event") EventEntity event,
                            @RequestPart(value = "eventImg", required = false) MultipartFile imageFile) {

    System.out.println("---");
        System.out.println(imageFile==null);
        System.out.println("---");
        // Получаем существующее событие
        EventEntity existingEvent = eventService.findEventById(id);
        // Обновляем изображение, если оно передано
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
                Path uploadPath = Paths.get(uploadDir);
                Files.createDirectories(uploadPath);
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                event.setEventImg(fileName); // Устанавливаем новое изображение
            } catch (IOException e) {
                throw new RuntimeException("Failed to store image file", e);
            }
        } else {
            // Если изображение не передано, оставляем старое
            event.setEventImg(existingEvent.getEventImg());
        }

        // Обновляем другие данные события
        event.setId(id); // Устанавливаем ID для обновления

        // Сохраняем обновленное событие
        eventService.updateEvents(id, event);
    }



    /*@PutMapping("/events/{id}/edit")
    public void updateEvent(@PathVariable Integer id,
                                                   @RequestPart("event") EventEntity event,
                                                   @RequestPart(value = "eventImg", required = false) MultipartFile imageFile) {
        // Проверяем, что id события из пути совпадает с id в теле запроса
        if (!id.equals(event.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "id does not match");
        }

        // Получаем существующее событие
        EventEntity existingEvent = eventService.findEventById(id);

        // Обновляем изображение, если оно передано
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
                Path uploadPath = Paths.get("uploads");
                Files.createDirectories(uploadPath);
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                event.setEventImg(fileName); // Устанавливаем новое изображение
            } catch (IOException e) {
                throw new RuntimeException("Failed to store image file", e);
            }
        } else {
            // Если изображение не передано, оставляем старое
            event.setEventImg(existingEvent.getEventImg());
        }

        // Обновляем другие данные события
        event.setId(id); // Устанавливаем ID для обновления

        // Сохраняем обновленное событие
        eventService.updateEvents(id,event);

    }*/


    @PatchMapping("/events/{id}/edit")
    public void subscribe(@PathVariable Integer id) {
        var event = eventService.findEventById(id);
        var currentUser = userService.getCurrentUser();
        if (event.getUsersPartIn().contains(currentUser)) {
            event.getUsersPartIn().remove(currentUser);
            currentUser.getEventsPartIn().remove(event);
            currentUser.setEventsAmount(currentUser.getEventsAmount() - 1);
            event.setUsersAmount(event.getUsersAmount() - 1);
        } else {
            event.getUsersPartIn().add(currentUser);
            currentUser.getEventsPartIn().add(event);
            currentUser.setEventsAmount(currentUser.getEventsAmount() + 1);
            event.setUsersAmount(event.getUsersAmount() + 1);
        }
        eventService.addEvent(event,null);
    }
}

