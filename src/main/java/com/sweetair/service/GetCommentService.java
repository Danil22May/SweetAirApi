package com.sweetair.service;

import com.sweetair.models.Comments;
import com.sweetair.repository.ICommentsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetCommentService {
    private final ICommentsRepository iCommentsRepository;

    public List<Comments> getAllComments() {
        return iCommentsRepository.findAll();
    }
}
