package vn.edu.iuh.fit.entities;

public class Login {
    String phoneNumber;
    String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Login() {
    }

    public Login(String phoneNumber, String password) {
        this.phoneNumber = phoneNumber;
        this.password = password;
    }

    @Override
    public String toString() {
        return "Login{" +
                "phoneNumber='" + phoneNumber + '\'' +
                "password='" + password + '\'' +
                '}';
    }
}
