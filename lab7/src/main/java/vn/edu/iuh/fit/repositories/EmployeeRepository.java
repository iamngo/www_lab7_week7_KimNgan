package vn.edu.iuh.fit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.models.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
