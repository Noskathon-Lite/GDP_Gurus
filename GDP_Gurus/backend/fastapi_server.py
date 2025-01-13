from fastapi import FastAPI
import pickle
from pydantic import BaseModel
import numpy as np

app = FastAPI()

# Load the model from the .pkl file
model_path = "/Users/void/Desktop/GDP_ Guru/GDP_Gurus/model/src/model/arima_gdp_model.pkl"
with open(model_path, 'rb') as file:
    model = pickle.load(file)

# Define the request data model
class InputData(BaseModel):
    data: list

# Prediction endpoint
@app.post("/forecast")
def predict(input_data: InputData):
    # Convert input data to numpy array
    data = np.array(input_data.data).reshape(1, -1)
    prediction = model.predict(data)
    return {"prediction": prediction.tolist()}

