package com.sweetair.service;

import com.sweetair.repository.ICommentsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteCommentService {

    private final ICommentsRepository iCommentsRepository;

    public void deleteCommentsById(int id) {
        iCommentsRepository.deleteById(id);
    }
}
