import sys
import pandas as pd
import joblib
import numpy as np
import matplotlib.pyplot as plt

# Accept the year argument from the command line
year = 2026 
print(f"Year: {year}")
print("working")

# File paths
data_path = '/Users/void/Desktop/GDP_ Guru/GDP_Gurus/backend/model/data/nepal.csv'
model_path = '/Users/void/Desktop/GDP_ Guru/GDP_Gurus/backend/model/src/model/arima_gdp_model.pkl'

# Load and prepare the data
data = pd.read_csv(data_path)

features = [
    'GDP_growth(annual%)', 
    'GDP_per_capita(USD)', 
    'Foreign_Direct_Investment_net_inflows(%_of_GDP)', 
    'Trade(%ofGDP)', 
    'POPULATION_TOTAL', 
    'GDP(current_USD)', 
    'Year'
]

# Clean and prepare the data
data_cleaned = data[features].dropna()
data_cleaned['Year'] = pd.to_datetime(data_cleaned['Year'], format='%Y')
data_cleaned.set_index('Year', inplace=True)
data_cleaned = data_cleaned.asfreq('YS')  # Ensure yearly frequency

gdp_series = data_cleaned['GDP(current_USD)']

# Load the trained ARIMA model
model = joblib.load(model_path)

# Perform the forecast
gdp_log_forecast = model.forecast(steps=1)
gdp_forecast = np.exp(gdp_log_forecast)  # Exponentiate to revert log transformation

# Access the forecasted value using iloc for positional indexing
forecasted_gdp = gdp_forecast.iloc[0] if hasattr(gdp_forecast, 'iloc') else gdp_forecast[0]
print(f"Forecasted GDP for year {year}: {forecasted_gdp:,.2f}")

# Create and save the forecast graph
plt.figure(figsize=(10, 6))
plt.plot(gdp_series.index, gdp_series, 'o-', color='blue', label='Actual GDP', alpha=0.8)
plt.plot(
    [gdp_series.index[-1], pd.to_datetime(str(year))],
    [gdp_series.iloc[-1], forecasted_gdp],
    '--',
    label=f'Forecast for {year}', color='red', linewidth=2
)
plt.xlabel('Year')
plt.ylabel('GDP (current USD)')
plt.title(f'GDP Forecast for {year}')
plt.legend()

# Save the plot as an image
plot_path = f'/Users/void/Desktop/GDP_ Guru/GDP_Gurus/backend/forecast_image/forecast_{year}.png'
plt.savefig(plot_path)
plt.close()

# Assuming the code above is correct, at the end of your Python script:

# Print raw GDP value and plot path for Node.js integration
print(f"{forecasted_gdp}")
print(plot_path)