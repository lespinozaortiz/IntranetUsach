package com.example.IntranetUsach.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Horarios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_horario;
    @ManyToOne
    @JoinColumn(name = "cod_asignatura")
    private Asignatura asignatura;//llave foranea
    String dia;
    String modulo;
    LocalTime hora_inicio;
    LocalTime hora_final;


}
