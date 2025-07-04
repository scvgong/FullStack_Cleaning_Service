package com.cleaning.backend.config;

import com.cleaning.backend.repository.BusinessUserRepository;
import com.cleaning.backend.security.JwtAuthenticationFilter;
import com.cleaning.backend.service.AdminUserDetailsService;
import com.cleaning.backend.service.BusinessUserDetailsService;
import com.cleaning.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;


import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final AdminUserDetailsService adminUserDetailsService;
    private final BusinessUserDetailsService businessUserDetailsService;
    private final BusinessUserRepository businessUserRepository;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtUtil, businessUserRepository);
    }

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
                        .requestMatchers(HttpMethod.POST,"/api/quotes").permitAll() // ✅ 사용자 견적 요청 허용
                        .requestMatchers("/api/business/register").permitAll() // 사업자 회원가입 요청 허용
                        .requestMatchers("/api/business/me").hasRole("BUSINESS")
                        .requestMatchers("/api/admin/faqs/**").permitAll()
                        .requestMatchers("/api/business/quotes/**").hasRole("BUSINESS") // 사업자 게시판 요청 허용
                        .requestMatchers("/api/business/inquiries").hasRole("BUSINESS")
                        .requestMatchers(HttpMethod.GET,    "/api/business/inquiries/**").hasRole("BUSINESS")
                        .requestMatchers(HttpMethod.POST,   "/api/business/inquiries/**").hasRole("BUSINESS")
                        .requestMatchers(HttpMethod.PUT,    "/api/business/inquiries/**").hasRole("BUSINESS")
                        .requestMatchers(HttpMethod.DELETE, "/api/business/inquiries/**").hasRole("BUSINESS")
                        .requestMatchers("/api/admin/inquiries").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET,    "/api/admin/inquiries/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,   "/api/admin/inquiries/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT,    "/api/admin/inquiries/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/admin/inquiries/**").hasRole("ADMIN")
                        .requestMatchers("/api/admin/users").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/admin/users/*/role").hasRole("ADMIN")
                        .anyRequest().authenticated() // 나머지는 인증 필요
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtil, businessUserRepository), UsernamePasswordAuthenticationFilter.class); // JWT 필터 추가
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



    // 관리용 Provider
    @Bean
    public DaoAuthenticationProvider adminAuthProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(adminUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    // 사업자용 Provider
    @Bean
    public DaoAuthenticationProvider businessAuthProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(businessUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    // 둘다 등록
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
//        return configuration.getAuthenticationManager();
//    }

    // ✅ 이 부분이 핵심입니다 둘다 등록
    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        DaoAuthenticationProvider adminProvider = new DaoAuthenticationProvider();
        adminProvider.setUserDetailsService(adminUserDetailsService);
        adminProvider.setPasswordEncoder(passwordEncoder());

        DaoAuthenticationProvider businessProvider = new DaoAuthenticationProvider();
        businessProvider.setUserDetailsService(businessUserDetailsService);
        businessProvider.setPasswordEncoder(passwordEncoder());

        return new ProviderManager(List.of(adminProvider, businessProvider));
    }

//    // 둘 다 등록
//    @Bean
//    public AuthenticationManager authenticationManager(
//            AuthenticationConfiguration config
//    ) throws Exception {
//        return config.getAuthenticationManager();
//    }

}
