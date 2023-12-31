package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.models.OrderDetail;
import vn.edu.iuh.fit.services.OrderDetailService;

@RestController
@RequestMapping(path = "/order-detail")
@CrossOrigin(origins = "*")
public class OrderDetailController {
    @Autowired
    private OrderDetailService orderDetailService;

    @PostMapping
    public boolean create(@RequestBody OrderDetail orderDetail){
        return orderDetailService.create(orderDetail) !=null;
    }
}
