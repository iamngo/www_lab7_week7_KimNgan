package vn.edu.iuh.fit.models;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "accounts")
public class Account implements Serializable {
    @Id
    @Column(name = "account_id")
    private long accountId;
    @Column(name = "phone_Number")
    private String phoneNumber;
    private String password;
    private String role;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cust_id")
    private Customer customer;

    public Account() {
    }

    public Account(long accountId, String phoneNumber,String password,  String role, Customer customer) {
        this.accountId = accountId;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.role = role;
        this.customer = customer;
    }

    public Account(long accountId, String password, String phoneNumber, String role) {
        this.accountId = accountId;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.role = role;
    }

    public Account(long accountId, String phoneNumber, String password ) {
        this.accountId = accountId;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }

    public long getAccountId() {
        return accountId;
    }

    public void setAccountId(long accountId) {
        this.accountId = accountId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Account{" +
                "accountId=" + accountId +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", customer=" + customer.getCustId() +
                '}';
    }
}