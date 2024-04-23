package com.boot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.formLogin((it) -> it
                .loginPage("/members/login")// 로그인 페이지 URL
                .defaultSuccessUrl("/") // 로그인 성공시 이동 URL
                .usernameParameter("email") // 로그인 시 사용할 파라미터 설정
                .failureUrl("/members/login/error") // 로그인 실패 이동 URL
        );

        http.logout((it) -> it
                .logoutRequestMatcher(new AntPathRequestMatcher("/members/logout"))
                .logoutSuccessUrl("/")
        );

        http.authorizeHttpRequests((req)-> {req
                .requestMatchers(antMatcher("/")).permitAll()
                .requestMatchers(antMatcher("/members/**")).permitAll()
                .requestMatchers(antMatcher("/item/**")).permitAll()
                .requestMatchers(antMatcher("/css/**")).permitAll()
                .requestMatchers(antMatcher("/images/**")).permitAll()
                .requestMatchers(antMatcher("/admin/**")).hasRole("ADMIN")
                .anyRequest().authenticated();
        });

        http.exceptionHandling((e) ->
                e.authenticationEntryPoint(new CustomAuthenticationEntryPoint()));

        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
