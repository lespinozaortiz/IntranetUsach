package com.example.IntranetUsach.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "asigcursadas")
public class Asigcursadas {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "asigcursadas_seq")
    @SequenceGenerator(name = "asigcursadas_seq", sequenceName = "asigcursadas_id_seq", allocationSize = 1)
    private Long idasigcursadas;
    @ManyToOne
    @JoinColumn(name = "rut")
    private Estudiante estudiante;//llave foranea
    @ManyToOne
    @JoinColumn(name = "codasig")
    private Asignatura asignatura;//llave foranea
    private int vecescursada;
    private String estado;

}
