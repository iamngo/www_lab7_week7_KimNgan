package vn.edu.iuh.fit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import vn.edu.iuh.fit.models.Employee;
import vn.edu.iuh.fit.repositories.EmployeeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> findAll(){
        return employeeRepository.findAll();
    }

    public Employee create(Employee employee){
        return employeeRepository.save(employee);
    }

    public Employee update(@RequestBody Employee employee){
        return employeeRepository.save(employee);
    }

    public void delete(long id){
        employeeRepository.deleteById(id);
    }

    public Optional<Employee> getById(@PathVariable("id") long id){
        return employeeRepository.findById(id);
    }

}
