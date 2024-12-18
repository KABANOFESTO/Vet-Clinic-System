package rw.veterinarian.veterinarian.controller;

import rw.veterinarian.veterinarian.model.ContactMessage;
import rw.veterinarian.veterinarian.services.ContactMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173") // Update with your frontend's URL
public class ContactMessageController {

    private final ContactMessageService service;

    public ContactMessageController(ContactMessageService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<String> submitMessage(@RequestBody ContactMessage message) {
        service.saveMessage(message);
        return ResponseEntity.ok("Message submitted successfully!");
    }

    @GetMapping
    public ResponseEntity<List<ContactMessage>> getMessages() {
        List<ContactMessage> messages = service.getAllMessages();
        return ResponseEntity.ok(messages);
    }
}
