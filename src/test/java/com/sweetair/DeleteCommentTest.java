package com.sweetair;

import com.sweetair.models.Comments;
import com.sweetair.repository.ICommentsRepository;
import com.sweetair.service.DeleteCommentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Transactional
public class DeleteCommentTest {
    @Autowired
    private DeleteCommentService deleteCommentService;

    @Autowired
    private ICommentsRepository iCommentsRepository;

    @Test
    public void testDeleteCommentsById() {

        Comments comment = new Comments();
        comment.setAuthor("Eva");
        comment.setComment("This is a comment");
        comment = iCommentsRepository.save(comment);

        assertTrue(iCommentsRepository.findById(comment.getId()).isPresent());

        deleteCommentService.deleteCommentsById(comment.getId());

        assertFalse(iCommentsRepository.findById(comment.getId()).isPresent());
    }
}
