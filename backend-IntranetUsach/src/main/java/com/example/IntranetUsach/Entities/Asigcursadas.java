package com.example.IntranetUsach.Entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table
@Data
public class Asigcursadas {
    @Id
    private Long id_asigcursadas;
    @ManyToOne
    @JoinColumn(name = "rut")
    private Estudiante estudiante;//llave foranea
    @ManyToOne
    @JoinColumn(name = "cod_asignatura")
    private Asignatura asignatura;//llave foranea
    private int cantidad;
    private String estado;

}
