package vn.edu.iuh.fit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.models.ProductPrice;

public interface ProductPriceRepository extends JpaRepository<ProductPrice, Long> {
}
