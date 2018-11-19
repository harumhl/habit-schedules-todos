# https://www.alphavantage.co/documentation/#daily
import requests
import pandas as pd

class AlphaVantageAPI:
    def __init__(self):
        self.prefix = "https://www.alphavantage.co/query?"
        self.apiKey = "WEU3P8NMFIG2FHIM"
    
    def get(self, function, symbol, fullOutput=False, formatToCsv=False):
        url = self.prefix
        url += "function=" + function
        url += "&symbol=" + symbol
        url += "&apikey=" + self.apiKey
        if (fullOutput == True):
            #default is compact
            url += "&outputsize=full"
        if (formatToCsv == True):
            #default is json
            url += "&datatype=csv"
        #print(url)
        return requests.get(url)

def run(function, symbol, fullOutput):
    c = AlphaVantageAPI()
    formatToCsv = False
    quote = c.get(function, symbol, fullOutput, formatToCsv)

    if (quote.status_code == 200):
        quote = quote.json()
        # deleting the meta data from the given json
        quote = quote["Time Series (Daily)"]
        df = pd.DataFrame.from_dict(quote)
        df = df.transpose()
        return df
    else:
        print("Failed to grab data")
        return None

def runAll(nasdaqList, fullOutput):
    data = {}
    for symbol in nasdaqList:
        data[symbol] = run("TIME_SERIES_DAILY_ADJUSTED", symbol, fullOutput)
    return data
