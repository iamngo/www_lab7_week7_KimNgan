package vn.edu.iuh.fit.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.edu.iuh.fit.models.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT p.name, prm.path, od.price, od.quantity, o.order_date FROM customer AS c INNER JOIN orders AS o ON c.cust_id = o.cust_id INNER JOIN order_detail AS od ON o.order_id = od.order_id INNER JOIN product AS p ON od.product_id = p.product_id INNER JOIN product_image AS prm ON p.product_id = prm.product_id WHERE c.cust_id = ? ORDER BY o.order_date DESC", nativeQuery = true)
    public List<Object[]> getProductsOrderedByCustomerID(long id);

    @Query(value = "SELECT p.product_id, p.name, pm.path, pr.price\n" +
            "FROM product AS p\n" +
            "INNER JOIN product_image AS pm ON p.product_id = pm.product_id\n" +
            "INNER JOIN (\n" +
            "    SELECT  note, price, price_date_time, product_id\n" +
            "    FROM (\n" +
            "        SELECT *,\n" +
            "            ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY price_date_time DESC) AS rn\n" +
            "        FROM product_price\n" +
            "    ) AS subquery\n" +
            "    WHERE rn = 1\n" +
            ") AS pr ON p.product_id = pr.product_id",
            countQuery = "SELECT COUNT(*) FROM product",
            nativeQuery = true)
    public List<Object[]> getInfoProducts(Pageable pageable);
}
