package com.sweetair.controllers;

import com.sweetair.models.Comments;
import com.sweetair.service.PutCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PutCommentsController {
    private final PutCommentService service;

    @PutMapping(path = "/comments/{id}", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public Comments updateComments(@PathVariable int id, @RequestBody Comments request) {
        return service.updateComments(request, id);
    }
}
