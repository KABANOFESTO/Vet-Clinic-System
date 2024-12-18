package rw.veterinarian.veterinarian.services;

import rw.veterinarian.veterinarian.model.TaskAssignment;
import rw.veterinarian.veterinarian.repository.TaskAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskAssignmentService {
    @Autowired
    private TaskAssignmentRepository taskAssignmentRepository;

    public TaskAssignment createTaskAssignment(TaskAssignment taskAssignment) {
        return taskAssignmentRepository.save(taskAssignment);
    }
}
