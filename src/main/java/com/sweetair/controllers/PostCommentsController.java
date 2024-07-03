package com.sweetair.controllers;

import com.sweetair.models.Comments;
import com.sweetair.service.PostCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PostCommentsController {
    private final PostCommentService service;

    @PostMapping(path = "/comments", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public Comments createComments(@RequestBody Comments request) {
        return service.createComments(request);
    }
}
