package rw.veterinarian.veterinarian;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"rw.veterinarian.veterinarian.model"})
@EnableJpaRepositories(basePackages = {"rw.veterinarian.veterinarian.repository"})
public class VeterinarianApplication {

	public static void main(String[] args) {
		SpringApplication.run(VeterinarianApplication.class, args);
	}

}
