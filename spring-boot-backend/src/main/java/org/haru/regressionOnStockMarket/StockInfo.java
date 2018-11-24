package org.haru.regressionOnStockMarket;

import lombok.Data;

@Data
public class StockInfo {

    private String nasdaqSymbol;
    private String date;
    private double open;
    private double high;
    private double low;
    private double close;
    private double adjustedClose;
    private double volume;
    private double dividentAmount;
    private double splitCoefficient;
}
