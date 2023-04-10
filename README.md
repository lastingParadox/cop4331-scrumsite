# Getting Started

If you haven't already, download Docker and Node. Go through the set up process for each dependent on your Operating System.

Copy `.env.template` to `.env`.

Head into `./server` and `./client` and run the following command in each directory:

```bash
npm install
```

*If you are setting up with Docker, the `node_modules` folder in each directory will expedite the time it takes for Express and React to start.*

## Setup Processes

### Using Docker for Development

In the root directory, run the following commands below. These commands build the containers following the instructions provided in `docker-compose.yml` and the `Dockerfile` files located in the `./server` and `./client` directories.

```bash
docker compose build
docker compose up -d
```

You should see two containers running through Docker Desktop under the name "cop4331-scrumsite"

* server - Corresponds to the Node Express backend of the project
* client - Corresponds to the React frontend of the project

Containers interact with each other not through localhost, but rather the names of the containers.

The client container sends requests to the server container through a proxy specified in the `./client` directory's `project.json`: "http://server:5000". This proxy allows all requests to be simplified; instead of sending a GET request to "http://server:5000/api/", a GET request can be made to "/api/" on the frontend.

## Testing If It Worked

On your web browser, head to `http://localhost:5000/api/`. You should see the following JSON object:

```json
"express": "YOUR EXPRESS BACKEND IS CONNECTED TO REACT"
```

This confirms that the server is running as appropriate. To see if React is running, head to `http://localhost:3000`. You should see a spinning React logo. At the bottom of the page (you may need to scroll down), you should see the same message defined in the JSON above. This confirms that the client is running as appropriate and is sending and receiving requests and responses successfully.
