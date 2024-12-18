package rw.veterinarian.veterinarian.services;

import org.springframework.stereotype.Service;
import rw.veterinarian.veterinarian.model.Staff;
import rw.veterinarian.veterinarian.repository.StaffRepository;

import java.util.List;

@Service
public class StaffService {
    private final StaffRepository staffRepository;

    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff saveStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    public void deleteStaff(Long id) {
        staffRepository.deleteById(id);
    }
}

