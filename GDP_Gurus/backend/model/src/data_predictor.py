import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA
import joblib

file = '/Users/void/Desktop/GDP_ Guru/GDP_Gurus/model/data/nepal.csv'
data = pd.read_csv(file)

features = ['GDP_growth(annual%)', 
            'GDP_per_capita(USD)', 
            'Foreign_Direct_Investment_net_inflows(%_of_GDP)', 
            'Trade(%ofGDP)', 
            'POPULATION_TOTAL', 
            'GDP(current_USD)', 
            'Year']

data_cleaned = data[features].dropna()

data_cleaned['Year'] = pd.to_datetime(data_cleaned['Year'], format='%Y')
data_cleaned.set_index('Year', inplace=True)
data_cleaned = data_cleaned.asfreq('YS') 

gdp_series = data_cleaned['GDP(current_USD)']

gdp_series_log = np.log(gdp_series)

arima_model = ARIMA(gdp_series_log, order=(5, 1, 0))
arima_model_fit = arima_model.fit()

model_directory = 'model'
if not os.path.exists(model_directory):
    os.makedirs(model_directory) 

model_filename = os.path.join(model_directory, 'arima_gdp_model.pkl')
joblib.dump(arima_model_fit, model_filename)
print(f"\nARIMA model saved to {model_filename}")

forecast_years = pd.date_range(start='2023', end='2030', freq='YS')
forecast_log = arima_model_fit.forecast(steps=len(forecast_years))
forecast = np.exp(forecast_log) 

print("\nARIMA Model Forecast (2023–2030):")
for year, gdp in zip(forecast_years.year, forecast):
    print(f"Year {year}: ${gdp:.2f}")

plt.figure(figsize=(14, 8))
plt.plot(gdp_series.index, gdp_series, 'o-', color='blue', label='Actual GDP', alpha=0.8)
plt.plot(forecast_years, forecast, '--', label='ARIMA Forecast (2023-2030)', color='red', linewidth=2, marker='o', markersize=6)
plt.xlabel('Year')
plt.ylabel('GDP (current USD)')
plt.title('GDP Prediction using ARIMA Model (2023–2030)')
plt.legend()
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('/Users/void/Desktop/GDP_ Guru/GDP_Gurus/model/gdp_forecast_plot.png') 
plt.show()