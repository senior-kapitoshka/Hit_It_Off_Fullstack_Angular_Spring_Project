package com.example.HIO.domain.model;

import com.example.HIO.entity.UserEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Event {

    @JsonProperty
    private Integer id;
    @JsonProperty
    private  Integer creatorId;
    @JsonProperty
    private  String city;
    @JsonProperty
    private  String eventName;
    @JsonProperty
    private  String description;
    @JsonProperty
    private Boolean restrictions;
    @JsonProperty
    private Long restrictionsLimit;

    @JsonProperty
    private String eventImg;

    @JsonProperty
    private Long usersAmount;
    @JsonProperty
    private String eventDate = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss z")
            .format(new Date());

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }



    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }





    public Boolean getRestrictions() {
        return restrictions;
    }

    public void setRestrictions(Boolean restrictions) {
        this.restrictions = restrictions;
    }

    public Long getRestrictionsLimit() {
        return restrictionsLimit;
    }

    public Long getUsersAmount() {
        return usersAmount;
    }

    public void setUsersAmount(Long usersAmount) {
        this.usersAmount = usersAmount;
    }

    public void setRestrictionsLimit(Long restrictionsLimit) {
        this.restrictionsLimit = restrictionsLimit;
    }

    public Integer getId(){
        return id;
    }

    public String getCity() {
        return city;
    }

    public Integer getCreatorId() {
        return creatorId;
    }

    public void setId(Integer id){
        this.id=id;
    }

    public void setCity(String city){
        this.city=city;
    }

    public void setCreatorId(Integer creator){
        this.creatorId=creator;
    }
}
