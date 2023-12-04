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
    @Column(name = "codasig", nullable = false, unique = true)
    private Long codasig;
    @ManyToOne
    @JoinColumn(name = "codcarr")
    private Carrera carrera;//llave foranea
    private String codplan;
    private String nombreasig;
    private Integer nivel;
    @Column(name = "cupo", nullable = true)
    private Integer cupo;
    @Column(name = "cantidad_estudiantes", nullable = true)
    private Integer cantidadestudiantes;

}
