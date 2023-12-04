package com.example.IntranetUsach.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Carrera {
    @Id
    @Column(name = "codcarr", nullable = false, unique = true)
    private Long codcarr;
    private String nombrecarrera;
}
