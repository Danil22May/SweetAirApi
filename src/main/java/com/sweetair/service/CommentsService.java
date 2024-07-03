package com.sweetair.service;


import com.sweetair.Repositories.ICommentsRepository;
import com.sweetair.models.Comments;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CommentsService {

    @Autowired
    ICommentsRepository iCommentsRepository;


    public ArrayList<Comments> getAllComments(){
        return (ArrayList<Comments>) iCommentsRepository.findAll();
    }

    public void deleteAllComments() {
        iCommentsRepository.deleteAll();
    }

    public void deleteCommentsById(int id) {
        iCommentsRepository.deleteById(id);
    }

    public Comments updateComments(Comments comments, int id) {
        Optional<Comments> optionalTutorial = iCommentsRepository.findById(id);
        Comments newComments = optionalComments.get();
        newComments.setComment(comments.getComment());
        newComments.setAuthor(comments.getAuthor());
        return iCommentsRepository.save(newComments);
    }

    public Comments createComments(Comments newComments) {
        return iCommentsRepository.save(newComments);

    }
}
