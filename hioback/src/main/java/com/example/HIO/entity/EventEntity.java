package com.example.HIO.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table
@Entity(name="events")
public class EventEntity {
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "event_id_seq")
    @SequenceGenerator(name = "event_id_seq", sequenceName = "event_id_seq", allocationSize = 1)
    @Id
    private Integer id;

    public String getEventImg() {
        return eventImg;
    }

    public void setEventImg(String eventImg) {
        this.eventImg = eventImg;
    }

    public Set<UserEntity> getUsersPartIn() {
        return usersPartIn;
    }

    public void setUsersPartIn(Set<UserEntity> usersPartIn) {
        this.usersPartIn = usersPartIn;
    }

    @Column(name = "creator_id", unique = true, nullable = false)
    private  Integer creatorId;
    @Column(name = "city", unique = false)
    private  String city;

    @Column(name = "event_created_at")
    private String eventCreatedAt = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss z")
            .format(new Date());
    @Column(name = "event_date")
    private String eventDate = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss z")
            .format(new Date());

    public Long getUsersAmount() {
        return Long.valueOf(usersPartIn.size());
    }

    public void setUsersAmount(Long usersAmount) {
        this.usersAmount = usersAmount;
    }

    @Column(name = "restrictions")
    private Boolean restrictions;

    @Column(name = "users_amount")
    private Long usersAmount;

    @Column(name = "restrictions_limit")
    private Integer restrictionsLimit;

    @Column(name = "description")
    private String description;
    @Column(name = "event_name")
    private String eventName;
    @Column(name = "event_img")
    private String eventImg;

    /// //////////////////////////
    @ManyToMany(mappedBy = "eventsPartIn")
    public Set<UserEntity> usersPartIn=new HashSet<>();

    /// //////////////////////////
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Boolean getRestrictions() {
        return restrictions;
    }

    public void setRestrictions(Boolean restrictions) {
        this.restrictions = restrictions;
    }

    public Integer getRestrictionsLimit() {
        return restrictionsLimit;
    }

    public void setRestrictionsLimit(Integer restrictionsLimit) {
        this.restrictionsLimit = restrictionsLimit;
    }

    public void setCreatorId(Integer creatorId) {
        this.creatorId = creatorId;
    }

    public void setEventCreatedAt(String eventCreatedAt) {
        this.eventCreatedAt = eventCreatedAt;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public Integer getCreatorId() {
        return creatorId;
    }

    public String getEventCreatedAt() {
        return eventCreatedAt;
    }

    public String getEventDate() {
        return eventDate;
    }

    public Integer getId() {
        return id;
    }
}
