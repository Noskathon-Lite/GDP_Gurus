import sys
import pandas as pd
import joblib
import numpy as np
import matplotlib.pyplot as plt

# Receive year and current GDP from the command line arguments
year = int(sys.argv[1])
currentGDP = sys.argv[2]

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

# Load the trained ARIMA model
model_path = '/Users/void/Desktop/GDP_ Guru/GDP_Gurus/model/arima_gdp_model.pkl'
model = joblib.load(model_path)

# Forecast the GDP for the requested year
gdp_log_forecast = model.forecast(steps=1) 
gdp_forecast = np.exp(gdp_log_forecast)

# Print the forecasted GDP for the requested year
print(f"Forecasted GDP for year {year}: {gdp_forecast[0]:,.2f}")

# Generate a plot of the actual vs. forecasted GDP
plt.figure(figsize=(10, 6))
plt.plot(gdp_series.index, gdp_series, 'o-', color='blue', label='Actual GDP', alpha=0.8)
plt.plot([data_cleaned.index[-1], pd.to_datetime(str(year))], 
         [gdp_series[-1], gdp_forecast[0]], '--', label=f'Forecast for {year}', color='red', linewidth=2)
plt.xlabel('Year')
plt.ylabel('GDP (current USD)')
plt.title(f'GDP Forecast for {year}')
plt.legend()

# Save the plot
plot_path = f'/Users/void/Desktop/GDP_ Guru/GDP_Gurus/backend/forecast_image/forecast_{year}.png'
plt.savefig(plot_path)
plt.close()

# Send the forecasted GDP and plot path back to the backend
print(f'{gdp_forecast[0]}')
print(plot_path)