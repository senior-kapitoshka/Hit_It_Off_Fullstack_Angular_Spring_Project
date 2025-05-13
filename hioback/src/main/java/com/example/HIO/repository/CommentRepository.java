package com.example.HIO.repository;

import com.example.HIO.entity.CommentEntity;
import com.example.HIO.entity.EventEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends CrudRepository<CommentEntity, Integer> {
    @Query(value="""
            select * from comments where event_id=:event_id
            """,nativeQuery = true)
    List<CommentEntity> getCommentsByEventId(@Param("event_id")Integer event_id);
}
