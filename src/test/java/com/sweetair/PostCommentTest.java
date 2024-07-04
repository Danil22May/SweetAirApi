package com.sweetair;


import com.sweetair.models.Comments;
import com.sweetair.repository.ICommentsRepository;
import com.sweetair.service.PostCommentService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@Transactional
public class PostCommentTest {
    @Autowired
    private PostCommentService postCommentService;

    @Autowired
    private ICommentsRepository iCommentsRepository;

    @Test
    public void testPostComments() {
        Comments newcomments = new Comments();
        newcomments.setAuthor("Pedro");
        newcomments.setComment("This is a comment test");

        Comments createdComment = postCommentService.createComments(newcomments);

        assertNotNull(createdComment.getId());
        assertEquals("Pedro", createdComment.getAuthor());
        assertEquals("This is a comment test", createdComment.getComment());

        Comments foundComment = iCommentsRepository.findById(createdComment.getId()).orElse(null);
        assertNotNull(foundComment);
        assertEquals("Pedro", foundComment.getAuthor());
        assertEquals("This is a comment test", foundComment.getComment());
    }
}

