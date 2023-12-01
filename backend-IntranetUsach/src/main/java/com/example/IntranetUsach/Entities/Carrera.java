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
    @Column(name = "cod_carrera", nullable = false, unique = true)
    private Long cod_carrera;
    private String nombre_carrera;
}
