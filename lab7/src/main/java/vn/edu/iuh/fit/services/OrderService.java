package vn.edu.iuh.fit.services;

import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.models.Order;
import vn.edu.iuh.fit.repositories.OrderRepository;

import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order create(Order order){
        return orderRepository.save(order);
    }

    public Optional<Order> getById(long id){
        return orderRepository.findById(id);
    }
}
