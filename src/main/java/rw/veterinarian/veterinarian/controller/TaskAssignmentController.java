package rw.veterinarian.veterinarian.controller;

import rw.veterinarian.veterinarian.model.TaskAssignment;
import rw.veterinarian.veterinarian.services.TaskAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskAssignmentController {
    @Autowired
    private TaskAssignmentService taskAssignmentService;

    @PostMapping
    public ResponseEntity<TaskAssignment> createTaskAssignment(@RequestBody TaskAssignment taskAssignment) {
        TaskAssignment createdAssignment = taskAssignmentService.createTaskAssignment(taskAssignment);
        return ResponseEntity.ok(createdAssignment);
    }
}
