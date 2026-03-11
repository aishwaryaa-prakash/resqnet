# ResQNet

ResQNet is an offline-first emergency communication system designed for disaster situations where internet or telecom networks fail.

## Problem Statement
During disasters such as floods, earthquakes, cyclones, or large-scale network outages, conventional communication systems often fail. Mobile networks may become congested or unavailable due to damaged infrastructure, power outages, or sudden spikes in communication demand. In such situations, individuals within the same geographic area—such as apartment complexes, campuses, relief shelters, or neighborhoods—struggle to coordinate, share updates, or request help.
This communication gap can significantly delay emergency response and community coordination. While telecom infrastructure may take time to recover, devices within the same local area often still have the ability to connect to each other through local networks such as Wi-Fi or hotspot connections.
There is currently a lack of simple, open-source solutions that allow communities to establish local communication channels independent of internet connectivity during such emergencies.

##  Proposed Solution
ResQNet is an offline-first emergency communication platform designed to enable real-time communication between devices connected within the same local network. The system allows users to communicate even when the internet or cellular networks are unavailable.
The application operates by allowing one device to host a local server while other nearby devices connect through a shared Wi-Fi network or hotspot. Once connected, users can exchange messages, send emergency alerts, and share safety status updates within the local cluster.
ResQNet focuses on providing community-level communication resilience, allowing people in the same physical vicinity to coordinate quickly during critical situations.

## Impact
ResQNet improves community-level coordination during emergencies by enabling real-time communication even when conventional networks fail. It allows individuals in the same location to quickly share updates, request assistance, and organize responses during disasters or network outages.
As an open-source system, the platform can be extended and adapted by developers and communities to support disaster preparedness, relief shelters, and emergency response environments. The project demonstrates how decentralized communication tools can strengthen resilience in situations where traditional infrastructure becomes unreliable.

## Features
The initial prototype focuses on essential functionality that demonstrates the concept of resilient local communication:
Local Network Communication
Devices connected to the same Wi-Fi or hotspot network can communicate without requiring internet access.
Real-Time Messaging
Users can send and receive messages instantly within the connected network.
Emergency Broadcast Alerts
A dedicated alert feature allows users to send urgent notifications to all connected devices simultaneously.
Safety Status Updates
Users can mark their status as “Safe” or “Need Help”, allowing others in the network to quickly assess community well-being.
Local Message Logging
Messages are stored locally to maintain communication records during the session.

## Conceptual Mesh Extension
While the initial implementation focuses on communication within a single local cluster, the architecture is designed with the possibility of future mesh-inspired extensions. In such systems, intermediary nodes can relay messages between clusters, enabling broader communication networks even when centralized infrastructure is unavailable.
For the prototype stage, a simplified relay concept may be demonstrated to illustrate the feasibility of multi-node communication.

## Tech Stack
Backend
Node.js
Express.js
Socket.io (for real-time communication)
Frontend
HTML/CSS or React for user interface
Data Storage
Lightweight local storage using JSON or SQLite
Development Tools
GitHub for version control
VS Code for development

## System Architecture
ResQNet follows a local server-client architecture:
One device hosts the communication server.
Nearby devices connect through the same local network.
Messages are transmitted via WebSockets.
The server broadcasts messages and alerts to all connected clients.
This allows the system to operate without cloud services or internet connectivity.

## Target Use Cases
Flood and cyclone response
Disaster relief shelters
Apartment or neighborhood coordination
Campus emergency communication
Temporary network outages

## Expected Impact
ResQNet helps communities maintain communication during emergencies by:
Enabling faster coordination
Allowing quick safety updates
Providing a communication fallback when telecom networks fail
Demonstrating the potential of decentralized communication tools

## Open Source Vision
ResQNet is designed as an open-source project so developers and communities can extend it for real-world disaster response scenarios and resilient communication systems.

## Project Setup/How to run
Prerequisites
Make sure the following are installed:
Node.js (v16 or later recommended)
npm (comes with Node.js)
Git
A modern web browser (Chrome, Edge, Firefox)

1. clone the repository
   git clone https://github.com/aishwaryaa-prakash/resqnet.git
   cd resqnet

2.Install Backend Dependencies
  Navigate to the backend folder:
   cd backend
   npm install
This installs the required packages:
express
socket.io

3.Start the Server
  Run the server:
       node server.js
  You should see:
       Server running on port 3000

4.Open the Frontend
   Navigate to the frontend folder and open the file:
     frontend/index.html
  You can open it by:
     double-clicking the file
     or
     dragging it into a browser

5. Test the Application
   Run the server.
   Open index.html in two different browser tabs or devices.
   Send a message.
   If messages appear in both windows, the system is working.
   Devices connected to the same Wi-Fi network can communicate without internet.


## Demo / Prototype
Current Prototype Capabilities
The current prototype demonstrates:
Local server hosting
Real-time messaging
Communication without internet
Multi-device local communication
Basic emergency communication framework

## Planned Features
The following features will be added during development:
1. Emergency broadcast alert button
2. Safety status indicators (Safe / Need Help)
3. Local message storage
4. Relay node logic for mesh-inspired communication
5. Improved user interface

## Future Scope
Future improvements may include:
True mesh networking support
Cluster-to-cluster communication
Offline-first mobile application
Enhanced disaster coordination features
