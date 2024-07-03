package com.sweetair.service;

import com.sweetair.models.Comments;
import com.sweetair.repository.ICommentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostCommentService {
    @Autowired
    ICommentsRepository iCommentsRepository;

    public Comments createComments(Comments newComments) {
        return iCommentsRepository.save(newComments);
    }
}
