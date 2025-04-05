from rest_framework.decorators import api_view
from rest_framework.response import Response
import yfinance as yf

@api_view(['GET'])
def get_stock_price(request):
    symbol = request.GET.get('symbol', 'AAPL')
    ticker = yf.Ticker(symbol)
    data = ticker.history(period='1d', interval='1m')

    # Convert DataFrame to list of dictionaries
    response_data = [
        {"time": str(row[0]), "price": float(row[1]["Close"])}
        for row in data.iterrows()
    ]

    print(response_data)

    return Response(response_data)
