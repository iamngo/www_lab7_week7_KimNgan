package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.models.Employee;
import vn.edu.iuh.fit.services.EmployeeService;

import java.util.List;

@RestController
@RequestMapping(path = "/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<Employee> getAll(){
        return employeeService.findAll();
    }

    @PostMapping
    public boolean create(@RequestBody Employee employee){
        return employeeService.create(employee) != null;
    }

    @GetMapping("/{id}")
    public Employee getById(@PathVariable("id") long id){
        return employeeService.getById(id).orElse(null);
    }

    @PutMapping
    public boolean update(@RequestBody Employee employee){
        return employeeService.update(employee) != null;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") long id){
        employeeService.delete(id);
    }
}
