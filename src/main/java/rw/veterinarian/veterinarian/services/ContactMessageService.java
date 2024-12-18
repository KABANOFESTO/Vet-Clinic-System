package rw.veterinarian.veterinarian.services;

import rw.veterinarian.veterinarian.model.ContactMessage;
import rw.veterinarian.veterinarian.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ContactMessageService {

    private final ContactMessageRepository repository;

    public ContactMessageService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    public ContactMessage saveMessage(ContactMessage message) {
        return repository.save(message);
    }
    public List<ContactMessage> getAllMessages() {
        return repository.findAll();
    }
}

