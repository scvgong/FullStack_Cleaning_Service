package com.cleaning.backend.config;

import com.cleaning.backend.filter.JwtAuthenticationFilter;
import com.cleaning.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtUtil jwtUtil;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:5173")); // 프론트 주소
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .csrf(csrf -> csrf.disable()) // CSRF 보호 비활성화 (필요 시 활성화 가능)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 사용 안함
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/uploads/**").permitAll() // 정적 파일 허용
                        .requestMatchers("/api/admin/auth/**").permitAll() // 관리자 로그인 관련 API 허용
                        .requestMatchers("/api/business/auth/**").permitAll() // 사업자 로그인 관련 API 허용
                        .requestMatchers("/api/quotes").permitAll() // ✅ 사용자 견적 요청 허용
                        .requestMatchers("/api/business/register").permitAll() // 사업자 회원가입 요청 허용
                        .requestMatchers("/api/admin/faqs/**").hasRole("ADMIN")
                        .requestMatchers("/api/business/quotes/**").hasRole("BUSINESS") // 사업자 게시판 요청 허용
                        .requestMatchers("/api/business/inquiries").hasRole("BUSINESS")
                        .requestMatchers("/api/business/inquiries/**").hasRole("BUSINESS")
                        .requestMatchers("/api/business/inquiries/**").hasRole("BUSINESS")
                        .requestMatchers("/api/business/inquiries/**").hasRole("BUSINESS")
                        .requestMatchers(HttpMethod.GET,    "/api/admin/inquiries/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,   "/api/admin/inquiries/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT,    "/api/admin/inquiries/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/admin/inquiries/**").hasRole("ADMIN")
                        .anyRequest().authenticated() // 나머지는 인증 필요
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class); // JWT 필터 추가
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
