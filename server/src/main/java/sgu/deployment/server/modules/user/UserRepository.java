package sgu.deployment.server.modules.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findAll();
    User save(User user);
    Optional<User> findById(Long id);

    @Modifying
    @Query(value = "DELETE FROM user WHERE id = :id ", nativeQuery = true)
    void delete(@Param("id") Long id);

    Optional<User> findByEmail(String email);
}
