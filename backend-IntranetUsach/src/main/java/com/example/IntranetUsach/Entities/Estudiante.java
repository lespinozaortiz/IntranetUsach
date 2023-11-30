package com.example.IntranetUsach.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Estudiante {
    @Id
    @Column(name = "rut", nullable = false, unique = true)
    private Long rut;
    private String nombres;
    private String apellidos;



