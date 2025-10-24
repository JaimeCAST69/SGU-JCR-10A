package sgu.deployment.server.modules.user;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sgu.deployment.server.utils.APIResponse;

@RestController
@RequestMapping("/api/user")
public class UserController {


    @Autowired
    private UserService clientService;

    @GetMapping("")
    public ResponseEntity<APIResponse> findAll() {
        APIResponse response = clientService.findAll();
        return new ResponseEntity<>(response, response.getStatus());
    }

    @PostMapping("")
    public ResponseEntity<APIResponse> saveClient(@Valid @RequestBody User payload) {
        APIResponse response = clientService.saveUser(payload);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse> findById(@PathVariable("id") Long id) {
        APIResponse response = clientService.findById(id);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @PutMapping("")
    public ResponseEntity<APIResponse> updateClient(@RequestBody User payload) {
        APIResponse response = clientService.updateUser(payload);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @DeleteMapping("")
    public ResponseEntity<APIResponse> deleteClient(@RequestBody User payload) {
        APIResponse response = clientService.deleteUser(payload);
        return new ResponseEntity<>(response, response.getStatus());
    }
}
