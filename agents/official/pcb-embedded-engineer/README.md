# PCB & Embedded Engineer v2.0

<p align="center">
  <strong>⚡ PCB & Embedded Engineer — Hardware Design & Firmware Agent</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" />
  <img src="https://img.shields.io/badge/category-development-green" />
  <img src="https://img.shields.io/badge/risk-high-red" />
  <img src="https://img.shields.io/badge/reasoning-react-purple" />
</p>

## What it does

- Designs system architectures with block diagrams and component selection
- Creates detailed pin mapping tables for STM32/ESP32/RP2040 MCUs
- Generates firmware architecture with RTOS task structures
- Produces design review checklists (power, signals, MCU, EMC)
- Calculates power budgets and thermal requirements

## Capabilities

| Feature | Detail |
|---------|--------|
| **Reasoning** | ReAct with datasheet-driven verification |
| **Max Steps** | 100 |
| **MCU Families** | STM32, ESP32, Arduino, RP2040, nRF52 |
| **Tools** | KiCad, Altium, STM32CubeIDE |
| **Protocols** | UART, SPI, I2C, CAN, USB, Ethernet |
| **Output Formats** | System Architecture, Pin Mapping, Firmware Skeleton, Design Review |

## Safety

- **Never claims production-ready** without verification steps
- **Always asks for missing constraints** (voltage, current, temperature)
- **References datasheets** for every component recommendation
- **Distinguishes prototype from production** design approaches
