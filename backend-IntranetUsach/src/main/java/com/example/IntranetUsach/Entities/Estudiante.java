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
    private String rut;
    private String nombres;
    private String apellidos;
    private String email;
    @OneToOne
    @JoinColumn(name = "cod_carrera")
    private Carrera carrera;
    @Column(name = "cantidad_asignaturas", nullable = true)
    private Integer cantidad_asignaturas;
    @Column(name = "nivel", nullable = true)
    private Integer nivel;
    @Column(name = "situacion", nullable = true)
    private String situacion;

}



