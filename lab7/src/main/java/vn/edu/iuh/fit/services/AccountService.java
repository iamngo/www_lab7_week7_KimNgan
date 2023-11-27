package vn.edu.iuh.fit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import vn.edu.iuh.fit.entities.Login;
import vn.edu.iuh.fit.models.Account;
import vn.edu.iuh.fit.repositories.AccountRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public Account update(@RequestBody Account account){
        return accountRepository.save(account);
    }

    public List<Account> findAll(){
        return accountRepository.findAll();
    }

    public Optional<Account> findById(long id){
        return accountRepository.findById(id);
    }

    public Optional<Account> login(Login login){
        return accountRepository.findByPhoneNumberAndPassword(login.getPhoneNumber(), login.getPassword());
    }

    public Optional<Account> findByPhoneNumber(String phone){
        return accountRepository.findByPhoneNumber(phone);
    }
    
}
