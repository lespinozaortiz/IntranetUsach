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
public class Prerrequisito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idprerrequisito;
    @ManyToOne
    @JoinColumn(name = "codasig")
    private Asignatura asignatura;//llave foranea
    private int codprerrequisito;
}
