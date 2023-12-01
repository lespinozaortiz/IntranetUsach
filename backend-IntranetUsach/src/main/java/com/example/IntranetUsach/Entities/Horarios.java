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
public class Horarios {
    @Id
    private Long id_horario;
    @ManyToOne
    @JoinColumn(name = "cod_asignatura")
    private Asignatura asignatura;//llave foranea
    

}
