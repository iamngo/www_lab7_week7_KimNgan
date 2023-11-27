package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.entities.InforProduct;
import vn.edu.iuh.fit.models.Product;
import vn.edu.iuh.fit.services.ProductService;

import java.util.List;

@RestController
@RequestMapping(path = "/product")
@CrossOrigin(origins = "*")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public Product getById(@PathVariable("id") long id){
        return productService.findById(id).orElse(null);
    }

    @GetMapping("/info-product/{page}")
    public List<InforProduct> getInforProducts(@PathVariable("page") int page){
        Pageable pageable = PageRequest.of(page,9);
        return productService.getInforProducts(pageable).getContent();
    }

    @GetMapping("/get-total-pages")
    public long getTotalPages(){
        return (long) Math.ceil((double) productService.getTotalPages()/9);
    }
}
