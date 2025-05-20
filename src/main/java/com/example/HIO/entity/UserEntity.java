package com.example.HIO.entity;

import com.example.HIO.domain.model.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Check;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@Check(constraints = "role IN ('ROLE_ADMIN', 'ROLE_USER', 'ROLE_BANNED','ROLE_MUTED')")
public class UserEntity implements UserDetails {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_seq")
    @SequenceGenerator(name = "user_id_seq", sequenceName = "user_id_seq", allocationSize = 1)
    private Integer id;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "city", unique = false, nullable = true)
    private String city;

    @Column(name = "about", nullable = true)
    private String about;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false )
    private Role role;

    @Column(name = "events_amount")
    private Long eventsAmount;

    public Long getEventsAmount() {
        return Long.valueOf(eventsPartIn.size());
    }

    public void setEventsAmount(Long eventsAmount) {
        this.eventsAmount = eventsAmount;
    }

    /// ///////////////////
    @ManyToMany
    @JoinTable(
            name = "part_in",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id"))
    public Set<EventEntity> eventsPartIn=new HashSet<>();
    ///   /////////////////
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}

