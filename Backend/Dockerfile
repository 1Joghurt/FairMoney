FROM python:3.12-slim

# Set build user to root
USER root

# Install the required system packages
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*


# Copy the application code to the working directory
COPY src /app

# Copy the requirements file to the working directory
COPY requirements.txt /app/requirements.txt

# Set the working directory inside the container
WORKDIR /app

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set user to non-root
USER 1001

# Expose the port on which the application will run
EXPOSE 8003

# Run the FastAPI application using uvicorn server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8003"]
