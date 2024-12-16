package rw.veterinarian.veterinarian.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    VETERINARIAN,
    RECEPTIONIST,
    NURSE,
    ADMIN;

    @JsonCreator
    public static Role fromString(String role) {
        for (Role r : values()) {
            if (r.name().equalsIgnoreCase(role)) {
                return r;
            }
        }
        throw new IllegalArgumentException("Unknown role: " + role);
    }

    @JsonValue
    public String getValue() {
        return name();
    }
}