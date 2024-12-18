package rw.veterinarian.veterinarian.model;

import jakarta.persistence.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Table(name = "inventory")
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremented Long ID
    private Long inventoryId;

    private String itemName;

    private String category; // Changed from enum to String

    private int initialStock;
    private int availableStock;

    @UpdateTimestamp
    private Date lastUpdate;

    public Inventory() {
    }

    public Inventory(Long inventoryId, String itemName, String category, int initialStock, int availableStock, Date lastUpdate) {
        this.inventoryId = inventoryId;
        this.itemName = itemName;
        this.category = category;
        this.initialStock = initialStock;
        this.availableStock = availableStock;
        this.lastUpdate = lastUpdate;
    }

    public Long getInventoryId() {
        return inventoryId;
    }

    public void setInventoryId(Long inventoryId) {
        this.inventoryId = inventoryId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getInitialStock() {
        return initialStock;
    }

    public void setInitialStock(int initialStock) {
        this.initialStock = initialStock;
    }

    public int getAvailableStock() {
        return availableStock;
    }

    public void setAvailableStock(int availableStock) {
        this.availableStock = availableStock;
    }

    public Date getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Date lastUpdate) {
        this.lastUpdate = lastUpdate;
    }
}


