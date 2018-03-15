module.exports = {
  "mcps": [
    {
      "address": 32,
      "porta": 0 ,
      "portb": 0
    },
    {
      "address": 33,
      "porta": 0,
      "portb": 0
    },
    {
      "address": 34,
      "porta":255,
      "portb":0
    },
    {
      "address": 35,
      "porta": 255,
      "portb": 255
    }
  ],
  "zones": [
    {
      "id": 1,
      "title": "Chambre 2",
      "lamps": [
        {
          "identifier": "1",
          "description": "Lampe 1",
          "status": true,
          "mcpInput": 35,
          "mcpOutput": 32,
          "addressInput": "GPIO A0",
          "addressOutput": "GPIO A5"
        },
        {
          "identifier": "2",
          "description": "Lampe 2",
          "status": true,
          "mcpInput": 35,
          "mcpOutput": 34,
          "addressInput": "GPIO A1",
          "addressOutput": "GPIO B7"
        },
        {
          "identifier": "3",
          "description": "Lampe 3",
          "status": true,
          "mcpInput": 35,
          "mcpOutput": 34,
          "addressInput": "GPIO A2",
          "addressOutput": "GPIO B6"
        },
        {
          "identifier": "4",
          "description": "Lampe 4",
          "status": true,
          "mcpInput": 35,
          "mcpOutput": 34,
          "addressInput": "GPIO A3",
          "addressOutput": "GPIO B5"
        }
      ],
      "windows": [
        {
          "identifier": "1",
          "title":"Fenetre Face",
          "mcpUp": 32,
          "addressUp": "GPIO A4",
          "upTime": 14650,
          "mcpDown": 32,
          "addressDown": "GPIO A3",
          "downTime": 14450

        },

        {
          "identifier": "1",
          "title":"Fenetre lit",
          "mcpUp": 33,
          "addressUp": "GPIO B4",
          "upTime": 14650,
          "mcpDown": 33,
          "addressDown": "GPIO B3",
          "downTime": 14450
        }

          ],
      "coolers": [
        {
          "identifier": "1",
          "description": "clim1",
          "status": true,
          "mcpInput": 34,
          "mcpOutput": 34,
          "addressInput": "GPIO A6",
          "addressOutput": "GPIO B1"
        }
      ]
    },
    {
      "id": 2,
      "title": "Chambre parent",
      "lamps": [
        {
          "identifier": "1",
          "description": "Lampe 1",
          "status": true,
          "mcpInput": 34,
          "mcpOutput": 34,
          "addressInput": "GPIO A3",
          "addressOutput": "GPIO B4"
        },
        {
          "identifier": "2",
          "description": "Lampe 2",
          "status": true,
          "mcpInput": 34,
          "mcpOutput": 34,
          "addressInput": "GPIO A4",
          "addressOutput": "GPIO B3"
        },
        {
          "identifier": "3",
          "description": "Lampe 3",
          "status": true,
          "mcpInput": 34,
          "mcpOutput": 34,
          "addressInput": "GPIO A5",
          "addressOutput": "GPIO B2"
        }
      ],
      "windows": [
        {
          "identifier": "1",
          "mcpUp": 33,
          "addressUp": "GPIO A5",
          "upTime": 14650,
          "mcpDown": 33,
          "addressDown": "GPIO A6",
          "downTime": 14450

        },
        {
          "identifier": "1",
          "mcpUp": 33,
          "addressUp": "GPIO A1",
          "upTime": 14650,
          "mcpDown": 33,
          "addressDown": "GPIO A2",
          "downTime": 14450
        }


          ],
      "coolers": [
        {
          "identifier": "1",
          "description": "clim1",
          "status": true,
          "mcpInput": 34,
          "mcpOutput": 34,
          "addressInput": "GPIO A7",
          "addressOutput": "GPIO B0"
        }

      ]
    }
  ],
  "notUsedOutputs": [
    {
      "mcp": 32,
      "pin": "GPIO A7"
    },
    {
      "mcp": 32,
      "pin": "GPIO A6"
    },

    {
      "mcp": 32,
      "pin": "GPIO A2"
    },
    {
      "mcp": 32,
      "pin": "GPIO A1"
    },
    {
      "mcp": 32,
      "pin": "GPIO B7"
    },
    {
      "mcp": 32,
      "pin": "GPIO B6"
    },
    {
      "mcp": 32,
      "pin": "GPIO B5"
    },
    {
      "mcp": 32,
      "pin": "GPIO B4"
    },
    {
      "mcp": 32,
      "pin": "GPIO B3"
    },
    {
      "mcp": 32,
      "pin": "GPIO B2"
    },
    {
      "mcp": 32,
      "pin": "GPIO B1"
    },
    {
      "mcp": 33,
      "pin": "GPIO A7"
    },
    {
      "mcp": 33,
      "pin": "GPIO A4"
    },
    {
      "mcp": 33,
      "pin": "GPIO A3"
    },
    {
      "mcp": 33,
      "pin": "GPIO B7"
    },
    {
      "mcp": 33,
      "pin": "GPIO B6"
    },
    {
      "mcp": 33,
      "pin": "GPIO B5"
    },
    {
      "mcp": 33,
      "pin": "GPIO B2"
    },
    {
      "mcp": 33,
      "pin": "GPIO B1"
    },
    {
      "mcp": 33,
      "pin": "GPIO A0"
    },
    {
      "mcp": 33,
      "pin": "GPIO B0"
    },
    {
      "mcp": 32,
      "pin": "GPIO A0"
    },
    {
      "mcp": 32,
      "pin": "GPIO B0"
    }
  ],
  "notUsedInputs": [
    {
      "mcp": 35,
      "pin": "GPIO A7"
    },
    {
      "mcp": 35,
      "pin": "GPIO A6"
    },
    {
      "mcp": 35,
      "pin": "GPIO A5"
    },
    {
      "mcp": 35,
      "pin": "GPIO A4"
    },
    {
      "mcp": 35,
      "pin": "GPIO B7"
    },
    {
      "mcp": 35,
      "pin": "GPIO B6"
    },
    {
      "mcp": 35,
      "pin": "GPIO B5"
    },
    {
      "mcp": 35,
      "pin": "GPIO B4"
    },
    {
      "mcp": 35,
      "pin": "GPIO B3"
    },
    {
      "mcp": 35,
      "pin": "GPIO B2"
    },
    {
      "mcp": 35,
      "pin": "GPIO B1"
    },
    {
      "mcp": 35,
      "pin": "GPIO B0"
    },
    {
      "mcp": 34,
      "pin": "GPIO A2"
    },
    {
      "mcp": 34,
      "pin": "GPIO A1"
    },
    {
      "mcp": 34,
      "pin": "GPIO A0"
    }
  ]
};
