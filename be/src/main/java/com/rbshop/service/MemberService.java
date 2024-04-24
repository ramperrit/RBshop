package com.rbshop.service;

import com.rbshop.dto.LoginDto;
import com.rbshop.dto.MemberFormDto;
import com.rbshop.dto.TokenRequest;
import com.rbshop.dto.TokenResponse;
import com.rbshop.entity.Member;
import com.rbshop.entity.RefreshToken;
import com.rbshop.jwt.TokenProvider;
import com.rbshop.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean validateMemberEmail(MemberFormDto member){
        Member existMember = memberRepository.findByEmail(member.getEmail());
        if(existMember != null){
            return false;
        }
        return true;
    }

    public void signup(MemberFormDto dto){
        if(validateMemberEmail(dto)){
            memberRepository.save(Member.createMember(dto, passwordEncoder));
        }else {
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email);
        if (member == null){
            throw new UsernameNotFoundException(email);
        }
        return User.builder()
                .username(member.getEmail())
                .password(member.getPassword())
                .roles(member.getRole().toString())
                .build();
    }

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenService refreshTokenService;

    public TokenResponse login(LoginDto dto){
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        //유저 조회
        Member member = memberRepository.findByEmail(authentication.getName());
        if (member == null){
            throw new EntityNotFoundException();
        }

        String newRefreshToken = tokenProvider.createRefreshToken(Duration.ofDays(1));

        RefreshToken existRefreshToken = refreshTokenService.findByMember(member);

        if (existRefreshToken == null){
            refreshTokenService.saveRefreshToken(new RefreshToken(member, newRefreshToken));
        }else {
            existRefreshToken.update(newRefreshToken);
        }

        String accessToken = tokenProvider.createAccessToken(member, Duration.ofHours(2));

        return new TokenResponse(accessToken, newRefreshToken, member.getRole().getKey());

    }

    public void logout(TokenRequest request){
        refreshTokenService.removeToken(request.getRefreshToken());
    }


    public TokenResponse tokenRefresh(TokenRequest request) throws Exception{
        //refresh 토큰까지 거부
        if (!tokenProvider.validateToken(request.getRefreshToken())){
            throw new IllegalAccessException("Unexpected token");
        }
        //refresh 토큰 정상
        RefreshToken refreshToken = refreshTokenService.findByRefreshToken(request.getRefreshToken());

        Member member = refreshToken.getMember();

        String accessToken = tokenProvider.createAccessToken(member, Duration.ofHours(2));
        String newRefreshToken = refreshToken.update(tokenProvider.createRefreshToken(Duration.ofDays(1))).getRefreshToken();

        return new TokenResponse(accessToken, newRefreshToken, member.getRole().getKey());

    }
}
