package com.sweetair.Repositories;

import org.hibernate.annotations.Comments;
import org.springframework.data.repository.CrudRepository;


public interface ICommentsRepository extends CrudRepository <Comments, Integer> {
}
