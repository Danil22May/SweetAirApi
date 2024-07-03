package com.sweetair.service;

import com.sweetair.models.Comments;
import com.sweetair.repository.ICommentsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PutCommentService {
    private final ICommentsRepository iCommentsRepository;

    public Comments updateComments(Comments request, int id) {
        return iCommentsRepository.findById(id).map(comment -> {
            Optional.ofNullable(request.getComment()).filter(value -> !Strings.isEmpty(value)).ifPresent(value -> comment.setComment(value));
            Optional.ofNullable(request.getAuthor()).filter(value -> !Strings.isEmpty(value)).ifPresent(value -> comment.setComment(value));
            return comment;
        }).orElse(null);
    }

}
