package com.example.IntranetUsach.Entities;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
@Data
public class Carrera {
    @Id
    private Long cod_carrera;
    private String nombre_carrera;
}
