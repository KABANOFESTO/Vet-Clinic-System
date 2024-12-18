package rw.veterinarian.veterinarian.repository;

import rw.veterinarian.veterinarian.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}
