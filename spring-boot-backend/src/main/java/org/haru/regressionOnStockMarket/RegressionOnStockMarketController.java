package org.haru.regressionOnStockMarket;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class RegressionOnStockMarketController {
    
    private RegressionOnStockMarketService service;
    
    RegressionOnStockMarketController(RegressionOnStockMarketService service) {
        this.service = service;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String get() {
        return this.service.get();
    }
    
    @RequestMapping(value = "/", method = RequestMethod.POST)
    public String add(@RequestBody StockInfo stock) {
        return this.service.add(stock);
    }
}
