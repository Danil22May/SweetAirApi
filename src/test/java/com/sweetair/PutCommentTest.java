package com.sweetair;


import com.sweetair.models.Comments;
import com.sweetair.repository.ICommentsRepository;
import com.sweetair.service.PutCommentService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@Transactional
public class PutCommentTest {
    @Autowired
    private PutCommentService putCommentService;

    @Autowired
    private ICommentsRepository iCommentsRepository;
    private Comments existingComment;

    @BeforeEach
    public void setUp() {
        existingComment = new Comments();
        existingComment.setAuthor("Pepe");
        existingComment.setComment("This is a fail comment");
        existingComment = iCommentsRepository.save(existingComment);
    }

    @Test
    public void testPutComments() {

        Comments updateCommentRequest = new Comments();
        updateCommentRequest.setAuthor("Pepito");
        updateCommentRequest.setComment("This is a corrected comment");

        Comments updatedComment = putCommentService.updateComments(updateCommentRequest, existingComment.getId());

        assertNotNull(updatedComment);
        assertEquals(existingComment.getId(), updatedComment.getId());
        assertEquals("Pepito", updatedComment.getAuthor());
        assertEquals("This is a corrected comment", updatedComment.getComment());

        Comments foundComment = iCommentsRepository.findById(existingComment.getId()).orElse(null);
        assertNotNull(foundComment);
        assertEquals("Pepito", foundComment.getAuthor());
        assertEquals("This is a corrected comment", foundComment.getComment());
    }
}
