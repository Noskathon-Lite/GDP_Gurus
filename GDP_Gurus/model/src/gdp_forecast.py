import joblib
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from datetime import datetime

def load_model():
    model = joblib.load('../model/arima_gdp_model.pkl') 
    return model

def forecast_gdp(current_gdp, forecast_year, model):
    current_year = datetime.now().year
    years_ahead = forecast_year - current_year

    forecast_index = pd.date_range(start=str(current_year), periods=years_ahead + 1, freq='A')

    forecast = model.predict(start=len(current_gdp), end=len(current_gdp) + years_ahead - 1, dynamic=False)

    plt.figure(figsize=(10, 6))
    plt.plot(np.arange(current_year, current_year + len(current_gdp)), current_gdp, label="Historical GDP")
    plt.plot(forecast_index, forecast, label="Forecasted GDP", color='red')
    plt.xlabel('Year')
    plt.ylabel('GDP')
    plt.title('GDP Forecast')
    plt.legend()

    plot_filename = '../backend/forecast_image/gdp_forecast.png'
    plt.savefig(plot_filename)
    plt.close()

    forecast_values = forecast.tolist()
    return forecast_values, plot_filename