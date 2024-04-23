package com.boot.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter @Setter
public class MemberFormDto {
    @NotBlank(message = "이름 입력 필수")
    private String name;

    @NotEmpty(message = "이메일 입력 필수")
    @Email(message = "이메일 형식으로 작성")
    private String email;

    @NotEmpty(message = "비밀번호 입력 필수")
    @Length(min=8, max=16, message = "8~16 자리")
    private String password;

    @NotEmpty(message = "주소 입력 필수")
    private String address;

}
