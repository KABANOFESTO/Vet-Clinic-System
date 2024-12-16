package rw.veterinarian.veterinarian.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rw.veterinarian.veterinarian.model.User;
import rw.veterinarian.veterinarian.model.Role;
import rw.veterinarian.veterinarian.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User createUser(User user) throws Exception {
        // Check if the user already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new Exception("User with email " + user.getEmail() + " already exists.");
        }

        // Ensure the role is not null
        if (user.getRole() == null) {
            user.setRole(Role.RECEPTIONIST); // Default to RECEPTIONIST role
        }

        // Encrypt the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save user to the database
        return userRepository.save(user);
    }

    @Override
    public boolean authenticateUser(String email, String rawPassword) throws Exception {
        // Find the user by email
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        if (userOptional.isEmpty()) {
            throw new Exception("User not found with email: " + email);
        }

        User user = userOptional.get();
        
        // Check if the provided password matches the stored encoded password
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    @Override
    public void deleteUser(String email) {
        // First check if user exists to throw meaningful exception
        User user = getUser(email);
        userRepository.delete(user);
    }

    // Additional method for password reset token management
    public void createPasswordResetTokenForUser(String email) {
        User user = getUser(email);
        // Generate and save password reset token logic would go here
        // This is a placeholder for the full implementation
    }
}