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
public class Asignatura {
    @Id
    @Column(name = "cod_asignatura", nullable = false, unique = true)
    private Long cod_asignatura;
    @ManyToOne
    @JoinColumn(name = "cod_carrera")
    private Carrera carrera;//llave foranea
    private String cod_plan;
    private String nombre_asignatura;
    private Integer nivel;
    @Column(name = "cupo", nullable = true)
    private Integer cupo;
    @Column(name = "cantidad_estudiantes", nullable = true)
    private Integer cantidad_estudiantes;

}
