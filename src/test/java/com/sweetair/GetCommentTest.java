package com.sweetair;

import com.sweetair.models.Comments;
import com.sweetair.repository.ICommentsRepository;
import com.sweetair.service.GetCommentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Transactional
public class GetCommentTest {
    @Autowired
    private GetCommentService getCommentService;

    @Autowired
    private ICommentsRepository iCommentsRepository;

    @Test
    public void testGetAllComments() {

        Comments comment1 = new Comments();
        comment1.setAuthor("Cristina");
        comment1.setComment("This is comment 1");
        iCommentsRepository.save(comment1);

        Comments comment2 = new Comments();
        comment2.setAuthor("Nerea");
        comment2.setComment("This is comment 2");
        iCommentsRepository.save(comment2);

        List<Comments> commentsList = getCommentService.getAllComments();

        assertEquals(2, commentsList.size());

        assertTrue(commentsList.contains(comment1));
        assertTrue(commentsList.contains(comment2));
    }
}
