import sys
import pandas as pd
import joblib
import numpy as np
import matplotlib.pyplot as plt

year = int(sys.argv[1])
country = sys.argv[2] 

data_path = '/Users/void/Desktop/GDP_ Guru/GDP_Gurus/model/data/nepal.csv'
data = pd.read_csv(data_path)

# Preprocess the data
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

model_path = '/Users/void/Desktop/GDP_ Guru/GDP_Gurus/model/arima_gdp_model.pkl'
model = joblib.load(model_path)

gdp_log_forecast = model.forecast(steps=1) 
gdp_forecast = np.exp(gdp_log_forecast)

print(f"Forecasted GDP for {country} in {year}: ${gdp_forecast[0]:,.2f}")

plt.figure(figsize=(10, 6))
plt.plot(gdp_series.index, gdp_series, 'o-', color='blue', label='Actual GDP', alpha=0.8)
plt.plot([data_cleaned.index[-1], pd.to_datetime(str(year))], 
         [gdp_series[-1], gdp_forecast[0]], '--', label=f'Forecast for {year}', color='red', linewidth=2)
plt.xlabel('Year')
plt.ylabel('GDP (current USD)')
plt.title(f'GDP Forecast for {year}')
plt.legend()
plt.savefig('/Users/void/Desktop/GDP_ Guru/GDP_Gurus/backend/forecast_image/forecast_{year}.png')
plt.show()