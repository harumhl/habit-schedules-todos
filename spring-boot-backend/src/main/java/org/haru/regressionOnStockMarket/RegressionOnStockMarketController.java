package org.haru.regressionOnStockMarket;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import java.lang.Exception;
import java.util.List;

@RestController
public class RegressionOnStockMarketController {
    
    private RegressionOnStockMarketService service;
    
    RegressionOnStockMarketController(RegressionOnStockMarketService service) {
        this.service = service;
    }
    
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<StockInfo> get(@RequestHeader(value="ID-TOKEN") String idToken) {
        try {
            this.service.verifyUserIdToken(idToken);
        }
        catch (Exception e) {
            ;
        }
        return this.service.get();
    }
    
    @RequestMapping(value = "/", method = RequestMethod.POST)
    public String add(@RequestHeader(value="ID-TOKEN") String idToken,
                      @RequestBody StockInfo stock) {
        try {
            this.service.verifyUserIdToken(idToken);
        }
        catch (Exception e) {
            ;
        }
        return this.service.add(stock);
    }
}
