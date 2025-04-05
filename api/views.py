import yfinance as yf
from rest_framework.decorators import api_view
from rest_framework.response import Response



@api_view(['GET'])
def get_stock_price(request):
    symbol = request.GET.get('symbol', 'AAPL')
    ticker = yf.Ticker(symbol)
    data = ticker.history(period='1d', interval='1m')

    response_data = [
        {"time": str(row[0]), "price": float(row[1]["Close"])}
        for row in data.iterrows()
    ]

    return Response(response_data)