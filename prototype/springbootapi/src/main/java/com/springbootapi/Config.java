package com.springbootapi;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Config  implements WebMvcConfigurer{
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:5500")
            .allowedMethods("*")
            .allowedHeaders("*");
    }

    // @Bean
    // public FilterRegistrationBean<RequestFilter> loggingFilter() {
    //     FilterRegistrationBean<RequestFilter> registrationBean = new FilterRegistrationBean<>();
    //     registrationBean.setFilter(new RequestFilter());
    //     registrationBean.addUrlPatterns("/*"); // Apply to all requests

    //     return registrationBean;
    // }

}
