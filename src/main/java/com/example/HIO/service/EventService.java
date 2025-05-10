package com.example.HIO.service;

import com.example.HIO.domain.model.Event;
import com.example.HIO.entity.EventEntity;
import com.example.HIO.exception.NotFoundException;
import com.example.HIO.repository.EventRepository;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class EventService {
    @Value("${upload.dir}")
    private String uploadDir;
    @Autowired
    private EventRepository repository;

    public EventEntity findEventById(Integer id) {
        var entity=repository.findById(id);
        if(!entity.isPresent()){
            throw new NotFoundException("such an ID does not exist");

        }
        return entity.get();
    }

    public Iterable<EventEntity> findEvents() {
        return repository.findAll();
    }
    public EventEntity addEvent(EventEntity event, MultipartFile imageFile) {
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
                Path uploadPath = Paths.get(uploadDir); // Лучше использовать @Value("${upload.dir}")
                Files.createDirectories(uploadPath);
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                event.setEventImg(fileName);
            } catch (IOException e) {
                throw new RuntimeException("Failed to store image file", e);
            }
        }

        return repository.save(event);
    }
    public void removeEventById(Integer id) {

        repository.deleteById(id);
    }
    /*public void updateEvents(Integer id, EventEntity event) {
        var entity=repository.findById(id);
        if(entity.isPresent()) repository.save(event);
    }*/

    public void updateEvents(Integer id, EventEntity event) {
        var entityOptional = repository.findById(id);
        if (entityOptional.isPresent()) {
            EventEntity existingEvent = entityOptional.get();

            if (event.getCity() != null) existingEvent.setCity(event.getCity());
            if (event.getUsersAmount() != null) existingEvent.setUsersAmount(event.getUsersAmount());
            if (event.getCreatorId() != null) existingEvent.setCreatorId(event.getCreatorId());

            if (event.getEventName() != null) existingEvent.setEventName(event.getEventName());
            if (event.getEventDate() != null) existingEvent.setEventDate(event.getEventDate());
            if (event.getDescription() != null) existingEvent.setDescription(event.getDescription());
            if (event.getRestrictions() != null) existingEvent.setRestrictions(event.getRestrictions());
            if (event.getRestrictionsLimit() != null) existingEvent.setRestrictionsLimit(event.getRestrictionsLimit());

            // Если изображение новое, то обновляем его
            if (event.getEventImg() != null) {
                existingEvent.setEventImg(event.getEventImg());
            }

            // Сохраняем обновленное событие
            repository.save(existingEvent);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found");
        }
    }



    public String[] getCities(){
        return repository.getCities();
    }
    public List<EventEntity> getEventsByCity(String city){
        return repository.getEventsByCity(city);
    }
}
