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


data_cleaned = data[features].dropna()  # Remove rows with missing values

# Ensure 'Year' is recognized as a proper time index
data_cleaned['Year'] = pd.to_datetime(data_cleaned['Year'], format='%Y')  # Convert to datetime
data_cleaned.set_index('Year', inplace=True)  # Set 'Year' as the index
data_cleaned = data_cleaned.asfreq('YS')  # Ensure a yearly frequency for the index

# Use 'GDP(current_USD)' for ARIMA modeling
gdp_series = data_cleaned['GDP(current_USD)']

# Apply log transformation to stabilize variance (optional)
gdp_series_log = np.log(gdp_series)

# Fit the ARIMA model (using a simple configuration with p=5, d=1, q=0 for now)
arima_model = ARIMA(gdp_series_log, order=(5, 1, 0))
arima_model_fit = arima_model.fit()

# ======= Save the trained ARIMA model to a .pkl file =======
model_filename = '/Users/void/Desktop/GDP_ Guru/GDP_Gurus/model/arima_gdp_model.pkl'  # Full path for saving the model
joblib.dump(arima_model_fit, model_filename)  # Save the model as a .pkl file
print(f"\nARIMA model saved to {model_filename}")

# Forecast for the years 2023 to 2030
forecast_years = pd.date_range(start='2023', end='2030', freq='YS')  # Correct frequency for yearly steps
forecast_log = arima_model_fit.forecast(steps=len(forecast_years))
forecast = np.exp(forecast_log)  # Convert back to original scale

# ======= Print Forecast Results =======
print("\nARIMA Model Forecast (2023–2030):")
for year, gdp in zip(forecast_years.year, forecast):
    print(f"Year {year}: ${gdp:.2f}")

# ======= Plot Results =======
plt.figure(figsize=(14, 8))

# Plot actual data (Training Data)
plt.plot(gdp_series.index, gdp_series, 'o-', color='blue', label='Actual GDP', alpha=0.8)

# Plot ARIMA forecast (2023–2030) with markers at each forecast year
plt.plot(forecast_years, forecast, '--', label='ARIMA Forecast (2023-2030)', linewidth=2, marker='o', markersize=6, color='red')

# Add labels, title, and legend
plt.xlabel('Year', fontsize=12)
plt.ylabel('GDP (current USD)', fontsize=12)
plt.title('GDP Prediction using ARIMA Model (2023–2030)', fontsize=16)
plt.legend(fontsize=12)
plt.grid(color='gray', linestyle='--', linewidth=0.5, alpha=0.7)

# Beautify the x-axis (show all years)
plt.xticks(rotation=45)
plt.tight_layout()

# Add background color
plt.gca().set_facecolor('#f9f9f9')

plt.show()