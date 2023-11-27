package vn.edu.iuh.fit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.entities.InforProduct;
import vn.edu.iuh.fit.models.Product;
import vn.edu.iuh.fit.repositories.ProductRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Optional<Product> findById(long id){
        return productRepository.findById(id);
    }

    public long getTotalPages(){
        return productRepository.count();
    }

    public Page<InforProduct> getInforProducts(Pageable pageable){
        List<InforProduct> inforProducts = new ArrayList<>();
        for(Object[] rs : productRepository.getInfoProducts(pageable)){
            long productId = (long) rs[0];
            String productName = (String) rs[1];
            String imagePath = (String) rs[2];
            double price = (double) rs[3];
            InforProduct inforProduct = new InforProduct(productId,productName,imagePath,price);
            inforProducts.add(inforProduct);
        }
        return new PageImpl<>(inforProducts, pageable, inforProducts.size());
    }
}
