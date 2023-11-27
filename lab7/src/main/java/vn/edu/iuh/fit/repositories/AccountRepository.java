package vn.edu.iuh.fit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.models.Account;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    public Optional<Account> findByPhoneNumberAndPassword(String phone, String password);
    public Optional<Account> findByPhoneNumber(String phone);

}
