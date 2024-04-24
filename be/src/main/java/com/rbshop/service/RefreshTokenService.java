package com.rbshop.service;

import com.rbshop.entity.Member;
import com.rbshop.entity.RefreshToken;
import com.rbshop.repository.RefreshTokenRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshToken findByRefreshToken(String refreshToken){
        return refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(()->new IllegalArgumentException("잘못된 토큰"));
    }

    public RefreshToken findByMember(Member member){
        return refreshTokenRepository.findByMember(member).orElse(null);
    }

    public void saveRefreshToken(RefreshToken refreshToken){
        refreshTokenRepository.save(refreshToken);
    }

    public void removeToken(@Valid String refreshToken){
        RefreshToken findToken = refreshTokenRepository
                .findByRefreshToken(refreshToken)
                .orElseThrow(EntityNotFoundException::new);
        refreshTokenRepository.delete(findToken);
    }
}
