package com.sunbeam;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors()
            .and()
            .authorizeHttpRequests()
                .requestMatchers(
                    "/user/register", 
                    "/user/login", 
                    "/user/**",
                    "/admin/login",
                    "/admin/register",
                    "/products/**",
                    "/products/{id}",
                    "/orders/**",
                    "/order-details/**",

                    // Swagger access (for Springdoc OpenAPI 3)
                    "/v3/api-docs/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/swagger-resources/**",
                    "/webjars/**"
                ).permitAll()
                .anyRequest().authenticated()
            .and()
            .formLogin().disable();

        return http.build();
    }
}
