package com.cleaning.backend.security;


import com.cleaning.backend.model.BusinessUser;
import com.cleaning.backend.model.auth.BusinessUserDetails;
import com.cleaning.backend.repository.BusinessUserRepository;
import com.cleaning.backend.util.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final BusinessUserRepository businessUserRepository; // ✅ 추가

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtUtil.validateToken(token)) {
                Claims claims = jwtUtil.extractAllClaims(token);

                // ✅ Role 추출
                Object roleObj = claims.get("role");
                String role = null;
                if (roleObj instanceof List<?> roleList && !roleList.isEmpty()) {
                    role = roleList.get(0).toString();
                } else if (roleObj instanceof String str) {
                    role = str;
                }

                if (role != null && role.equals("BUSINESS")) {
                    // ✅ principal 을 BusinessUserDetails 로 설정
                    String username = claims.getSubject();
                    BusinessUser user = businessUserRepository.findByUsername(username)
                            .orElseThrow(() -> new RuntimeException("User not found"));

                    BusinessUserDetails userDetails = new BusinessUserDetails(user);

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    List.of(new SimpleGrantedAuthority("ROLE_" + role))
                            );
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}