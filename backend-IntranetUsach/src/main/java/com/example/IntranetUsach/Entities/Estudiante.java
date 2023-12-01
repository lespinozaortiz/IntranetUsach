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
public class Estudiante {
    @Id
    @Column(name = "rut", nullable = false, unique = true)
    private Long rut;
    private String nombres;
    private String apellidos;
    private String email;
    private int cantidad_asignaturas;
    @OneToOne
    @JoinColumn(name = "cod_carrera")
    private Carrera carrera;
}



