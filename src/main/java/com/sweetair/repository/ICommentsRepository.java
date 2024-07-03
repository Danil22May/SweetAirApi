package com.sweetair.repository;

import com.sweetair.models.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICommentsRepository extends JpaRepository<Comments, Integer> {
}
