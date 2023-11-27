package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.entities.Login;
import vn.edu.iuh.fit.models.Account;
import vn.edu.iuh.fit.services.AccountService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/accounts")
@CrossOrigin(origins = "*")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping
    public List<Account> findAllAccount(){
        return accountService.findAll();
    }

    @GetMapping("/{id}")
    public Account findById(@PathVariable("id") long id){
        Optional<Account> account = accountService.findById(id);
        return account.orElse(null);
    }

    @GetMapping("/get-by-phone/{phone}")
    public Account getAccountByPhone(@PathVariable("phone") String phone){
        return accountService.findByPhoneNumber(phone).orElse(null);
    }

    @PostMapping("/login")
    public Account login(@RequestBody Login login){
        return accountService.login(login).orElse(null);
    }
}
