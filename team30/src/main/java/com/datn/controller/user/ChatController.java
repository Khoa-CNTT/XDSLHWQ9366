package com.datn.controller.user;

import com.datn.dto.request.chatbox.ChatRequest;
import com.datn.dto.response.ChatResponse;
import com.datn.service.impl.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
@CrossOrigin
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        String reply = chatService.generateReply(request.getMessage());

        return new ResponseEntity<>(new ChatResponse(reply), HttpStatus.OK);
    }

}
