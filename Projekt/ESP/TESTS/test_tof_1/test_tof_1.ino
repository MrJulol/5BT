#include <Wire.h>
#include <Adafruit_VL53L0X.h>

Adafruit_VL53L0X lox = Adafruit_VL53L0X();
int red = 32;
int green = 25;

void setup() {
  Serial.begin(115200);
  while (!Serial) {
    delay(10);
  }
  Serial.println("VL53L0X Test");

  Wire.begin();

  if (!lox.begin()) {
    Serial.println("Failed to find VL53L0X sensor! Check wiring.");
    while (1) {
      delay(10);
    }
  }

  Serial.println("VL53L0X sensor initialized successfully.");

  pinMode(red, OUTPUT);
  pinMode(green, OUTPUT);
}

void setColor(int r, int g) {
  // Use PWM to control LED brightness
  analogWrite(red, r);
  analogWrite(green, g);
}

void loop() {
  VL53L0X_RangingMeasurementData_t measure;

  lox.rangingTest(&measure, false);

  if (measure.RangeStatus != 4 && measure.RangeMilliMeter < 800) {
    int distance = measure.RangeMilliMeter;
    Serial.print("Distance (mm): ");
    Serial.println(distance);

    // Map the distance to RGB values (adjust range as needed)
    int r = map(distance, 0, 1000, 0, 255);   // Red increases with distance
    int g = map(distance, 0, 1000, 255, 0);   // Green decreases with distance


    // Clamp the values
    r = constrain(r, 0, 255);
    r += 50;
    g = constrain(g, 0, 255);


    setColor(r, g); // Set the LED color

  } else {
    Serial.println("Out of range");
    setColor(255, 0); // Red for out of range
  }

  delay(100);
}