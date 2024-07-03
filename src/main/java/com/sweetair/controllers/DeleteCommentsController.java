package com.sweetair.controllers;

import com.sweetair.service.DeleteCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class DeleteCommentsController {

    private final DeleteCommentService service;

    @DeleteMapping(path = "/comments/{id}")
    public void deleteCommentsById(@PathVariable int id) {
        service.deleteCommentsById(id);
    }
}
