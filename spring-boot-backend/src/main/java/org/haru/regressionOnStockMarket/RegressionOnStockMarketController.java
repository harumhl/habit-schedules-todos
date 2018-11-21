package org.haru.regressionOnStockMarket;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class RegressionOnStockMarketController {
    
    private RegressionOnStockMarketService service;
    
    RegressionOnStockMarketController(RegressionOnStockMarketService service) {
        this.service = service;
    }

    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }
}
