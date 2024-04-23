package com.boot.service;

import com.boot.dto.MemberFormDto;
import com.boot.entity.Member;
import com.boot.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public boolean validateUserId(MemberFormDto dto) {
        Member existMember = memberRepository.findByEmail(dto.getEmail());
        if(existMember == null){
            return existMember == null;
        }
        return false;
    }

    public void signup(MemberFormDto dto) {
        if (validateUserId(dto)) {
            memberRepository.save(Member.createMember(dto, passwordEncoder));
        } else {
            throw new RuntimeException("존재하는 아이디입니다.");
        }
    }


}
