package com.example.HIO.repository;


import com.example.HIO.domain.model.Event;
import com.example.HIO.entity.EventEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends CrudRepository<EventEntity, Integer> {
    @Query(value="""
            select distinct city from events
            """,nativeQuery = true)
    String[] getCities();

    @Query(value="""
            select * from events where city=:city
            """,nativeQuery = true)
    List<EventEntity> getEventsByCity(@Param("city")String city);
}
