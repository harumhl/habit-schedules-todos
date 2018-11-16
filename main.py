import alpha_Vantage
#import tensorFlow

#https://www.nasdaq.com/quotes/nasdaq-100-stocks.aspx
nasdaqList = ["AAPL","MSFT"]
fullOutput = False

data = alpha_Vantage.runAll(nasdaqList, fullOutput)

print(data)
print(data[nasdaqList[0]].columns)
