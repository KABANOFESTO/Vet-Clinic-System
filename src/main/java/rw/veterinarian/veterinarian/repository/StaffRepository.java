package rw.veterinarian.veterinarian.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rw.veterinarian.veterinarian.model.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long> {
}
