package rw.veterinarian.veterinarian.services;

import rw.veterinarian.veterinarian.model.Inventory;
import rw.veterinarian.veterinarian.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    // Create or update an inventory item
    public Inventory saveInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    // Get all inventory items
    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    // Get an inventory item by its ID
    public Optional<Inventory> getInventoryById(Long inventoryId) {
        return inventoryRepository.findById(inventoryId);
    }

    // Delete an inventory item by its ID
    public void deleteInventory(Long inventoryId) {
        inventoryRepository.deleteById(inventoryId);
    }
}
