package com.sunbeam.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Data // includes getters, setters, toString, equals, and hashCode
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    
    private String address;

    private String email;

    private String password;

    private String phoneNumber;
    
    private boolean status=true;
}


