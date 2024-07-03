package com.sweetair.controllers;


import com.sweetair.models.Comments;
import com.sweetair.service.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")

public class CommentsControllers {
    @Autowired
    CommentsService commentsService;

    @GetMapping(path = "/comments")
    public ArrayList<Comments> getAllComments() {
        return  commentsService.getAllComments();
    }

    @DeleteMapping (path = "/comments/{id}")
    public void deleteCommentsById(@PathVariable int id){
        commentsService.deleteCommentsById(id);
    }

    @PutMapping(path = "/comments/{id}")
    public Comments updateComments(@PathVariable int id, @RequestBody Comments comments) {
        return commentsService.updateComments(comments, id);
    }

    @PostMapping(path = "/comments")
    public Comments createComments(@RequestBody Comments newComments){
        return CommentsService.createComments(newComments);
    }

}
}
