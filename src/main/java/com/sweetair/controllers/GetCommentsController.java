package com.sweetair.controllers;

import com.sweetair.models.Comments;
import com.sweetair.service.GetCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class GetCommentsController {

    private final GetCommentService service;

    @GetMapping(path = "/comments", produces = APPLICATION_JSON_VALUE)
    public List<Comments> getAllComments() {
        return service.getAllComments();
    }
}
