package sgu.deployment.server.modules.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Pattern(regexp = "^[a-z0-9][a-z0-9_.]{3,}@[a-z]{2,}(\\.[a-z]{2,}){1,2}$", message = "corre no valido")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Pattern(regexp = "^[0-9]{10}$", message = "numero de telefono no valido")
    @Column(name = "phone", nullable = false)
    private String phone;

    public User() {
    }

    public User(Long id, String name, String email, String phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
