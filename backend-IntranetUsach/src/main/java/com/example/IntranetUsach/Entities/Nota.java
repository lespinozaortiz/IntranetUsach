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
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_nota;

    @ManyToOne
    @JoinColumn(name = "rut")
    private Estudiante estudiante;//llave foranea

    @ManyToOne
    @JoinColumn(name = "codasig")
    private Asignatura asignatura;//llave foranea
    int año;
    int semestre;
    float nota;
}
