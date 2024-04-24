package com.rbshop.controller;

import com.rbshop.dto.LoginDto;
import com.rbshop.dto.MemberFormDto;
import com.rbshop.dto.TokenRequest;
import com.rbshop.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Slf4j
public class AuthController {
    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Valid MemberFormDto dto){
        try{
            memberService.signup(dto);
            return new ResponseEntity<>("회원가입 완료", HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid LoginDto dto){
        try{
            return new ResponseEntity<>(memberService.login(dto), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    //refreshToken
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@Valid TokenRequest request){
        try {
            return new ResponseEntity<>(memberService.tokenRefresh(request), HttpStatus.OK); //tokenRefresh 메소드 생성해야함
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    //logoutAPI
    @PostMapping("/logout")
    public ResponseEntity<String> logout(TokenRequest request){
        try {
            memberService.logout(request);
        }catch (Exception e){
            log.info(e.getMessage());
        }
        return ResponseEntity.ok("로그아웃 되었습니다.");
    }
}
