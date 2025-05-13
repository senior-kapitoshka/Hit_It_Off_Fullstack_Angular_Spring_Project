package com.example.HIO.service;

import com.example.HIO.entity.CommentEntity;
import com.example.HIO.entity.EventEntity;
import com.example.HIO.exception.NotFoundException;
import com.example.HIO.repository.CommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CommentService {
    @Autowired
    private CommentRepository repository;

    public Iterable<CommentEntity> findCommentsByEventId(Integer eventId) {
        return repository.getCommentsByEventId(eventId);
    }

    public CommentEntity addComment(CommentEntity comment) {
        return repository.save(comment);
    }

    public void updateComments(Integer id, CommentEntity comment) {
        var entity=repository.findById(id);
        if(entity.isPresent()) repository.save(comment);
    }

    public CommentEntity findCommentById(Integer id) {
        var entity=repository.findById(id);
        if(!entity.isPresent()){
            throw new NotFoundException("such an ID does not exist");

        }
        return entity.get();

    }
    public void removeCommentById(Integer id) {
        repository.deleteById(id);
    }
}
