package com.sunbeam.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    @Value("${jwt.token.expiration.millis}")
    private long jwtExpiration;

    @Value("${jwt.token.secret}")
    private String jwtSecret;

    private Key jwtKey;

    @PostConstruct
    public void init() {
        jwtKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String createToken(Authentication auth) {
        org.springframework.security.core.userdetails.User user = 
            (org.springframework.security.core.userdetails.User) auth.getPrincipal();

        String subject = user.getUsername(); // typically email or userId
        String roles = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .claim("role", roles)
                .signWith(jwtKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public Authentication validateToken(String token) {
        JwtParser parser = Jwts.parserBuilder().setSigningKey(jwtKey).build();
        Claims claims = parser.parseClaimsJws(token).getBody();

        String username = claims.getSubject();
        String roles = claims.get("role", String.class);
        List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(roles);

        return new UsernamePasswordAuthenticationToken(username, null, authorities);
    }
}
