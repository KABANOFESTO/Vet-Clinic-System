package rw.veterinarian.veterinarian.repository;

import rw.veterinarian.veterinarian.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
