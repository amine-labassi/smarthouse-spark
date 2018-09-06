module.exports = {
    "mcps": [
        {
            "address": 32,
            "porta": 0,
            "portb": 0
        },
        {
            "address": 33,
            "porta": 0,
            "portb": 0
        },
        {
            "address": 34,
            "porta": 255,
            "portb": 0
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
            "title": "sallon",
            "lamps": [
                
                {
                    "identifier": "2",
                    "description": "salle a manger",
                    "status": true,
                    "mcpInput": 35,
                    "mcpOutput": 32,
                    "addressInput": 0,
                    "addressOutput": 15
                },{
                    "identifier": "3",
                    "description": "lamp 1",
                    "status": true,
                    "mcpInput": 35,
                    "mcpOutput": 34,
                    "addressInput": 3,
                    "addressOutput": 8
                },
                
                {
                    "identifier": "5",
                    "description": "lamp 2",
                    "status": true,
                    "mcpInput": 35,
                    "mcpOutput": 34,
                    "addressInput": 12 ,
                    "addressOutput": 9
                },
                {
                    "identifier": "6",
                    "description": "chambre",
                    "status": true,
                    "mcpInput": 35,
                    "mcpOutput": 32,
                    "addressInput": 11,
                    "addressOutput": 12
                }
                
            ],
            "windows": [
                

                
                
                {
                    "identifier": "1",
                    "title": "Fenetre 1",
                    "mcpUp": 33,
                    "addressUp": 7,
                    "upTime": 7280,
                    "mcpDown": 33,
                    "addressDown": 6,
                    "downTime": 7000,
                    "pointer" : 0
                },
                {
                    "identifier": "2",
                    "title": "Fenetre 2",
                    "mcpUp": 33,
                    "addressUp": 4,
                    "upTime": 7280,
                    "mcpDown": 33 ,
                    "addressDown": 5,
                    "downTime": 7000,
                    "pointer" : 0
                },
                {
                    "identifier": "3",
                    "title": "Fenetre 3",
                    "mcpUp": 34,
                    "addressUp": 14,
                    "upTime": 7280,
                    "mcpDown": 34,
                    "addressDown": 15,
                    "downTime": 7000,
                    "pointer" : 0
                }
                

            ],
            "coolers": [
                {
                    "identifier": "1",
                    "description": "clim1",
                    "status": true,
                    "mcpInput": 34,
                    "mcpOutput": 33,
                    "addressInput": 2,
                    "addressOutput": 10
                }
            ]
        },
        {
            "id": 2,
            "title": "Chambre parent",
            "lamps": [
            {
                    "identifier": "1",
                    "description": "lamp1",
                    "status": true,
                    "mcpInput": 35,
                    "mcpOutput": 33,
                    "addressInput": 6,
                    "addressOutput": 12
                },
                {
                    "identifier": "7",
                    "description": "lamp 2",
                    "status": true,
                    "mcpInput": 35,
                    "mcpOutput": 33,
                    "addressInput": 15,
                    "addressOutput": 15
                },{
                    "identifier": "3",
                    "description": "lamp 3",
                    "status": true,
                    "mcpInput": 35,
                    "mcpOutput": 33,
                    "addressInput": 5,
                    "addressOutput": 9
                }
                
                
            ],
            "windows": [
                {
                    "identifier": "1",
                    "title": "Fenetre lit",
                    "mcpUp": 32,
                    "addressUp": 5,
                    "upTime": 41670,
                    "mcpDown": 32,
                    "addressDown": 4,
                    "downTime": 39120,
                    "pointer" : 0
                },
                {
                    "identifier": "2",
                    "title": "Fenetre picine",
                    "mcpUp": 32,
                    "addressUp": 2,
                    "upTime": 30000,
                    "mcpDown": 32,
                    "addressDown": 3,
                    "downTime": 27500,
                    "pointer" : 0
                }

            ],
            "coolers": [
            {
                    "identifier": "1",
                    "description": "clim",
                    "status": true,
                    "mcpInput": 34,
                    "mcpOutput": 33,
                    "addressInput": 0,
                    "addressOutput": 11
                }
                

            ]
        },
        {
            "id": 3,
            "title": "salle d'eau",
            "lamps": [],
            "windows": [
                {
                    "identifier": "1",
                    "title": "Fenetre salle d'eau",
                    "mcpUp": 32,
                    "addressUp": 0,
                    "upTime": 7280,
                    "mcpDown": 32,
                    "addressDown": 1,
                    "downTime": 7000,
                    "pointer" : 0
                }

            ],
            "coolers": []
        },
        {
            "id": 4,
            "title": "cuisine",
            "lamps": [],
            "windows": [
               {
                    "identifier": "1",
                    "title": "cuisine",
                    "mcpUp": 33,
                    "addressUp": 3,
                    "upTime": 7280,
                    "mcpDown": 33,
                    "addressDown": 2,
                    "downTime": 7000,
                    "pointer" : 0
                }
            ],
            "coolers": [ {
                    "identifier": "1",
                    "description": "clim",
                    "status": true,
                    "mcpInput": 34,
                    "mcpOutput": 32,
                    "addressInput": 1,
                    "addressOutput": 11
                }]
        },
        {
            "id": 5,
            "title": "chambre bebe",
            "lamps": [{
                    "identifier": "2",
                    "description": "lamp",
                    "status": true,
                    "mcpInput": 35,
                    "mcpOutput": 33,
                    "addressInput": 2,
                    "addressOutput": 8
                }
                ],
            "windows": [
               {
                    "identifier": "1",
                    "title": "CHAMBRE BEBE",
                    "mcpUp": 32,
                    "addressUp": 7,
                    "upTime": 15450,
                    "mcpDown": 32,
                    "addressDown": 6,
                    "downTime": 15310,
                    "pointer" : 0

                }
            ],
            "coolers": [
                {
                    "identifier": "3",
                    "description": "lamp 3",
                    "status": true,
                    "mcpInput": 35,
                    "mcpOutput": 32,
                    "addressInput": 10,
                    "addressOutput": 9
                }
                ]
        },
        {
            "id": 6,
            "title": "Hall",
            "lamps": [
                {
                    "identifier": "7",
                    "description": "lamp 7",
                    "status": true,
                    "mcpInput": 35,
                    "mcpOutput": 32,
                    "addressInput": 1,
                    "addressOutput": 13
                },
                {
                    "identifier": "8",
                    "description": "lamp 8",
                    "status": true,
                    "mcpInput": 35,
                    "mcpOutput": 32,
                    "addressInput": 9,
                    "addressOutput": 14
                }
                
                
                
                
                
                ],
            "windows": [],
            "coolers": []
        },
        {
            "id": 7,
            "title": "ncv32",
            "lamps": [
            
                
                
               
                {
                    "identifier": "5",
                    "description": "lamp 5",
                    "status": true,
                    "mcpInput": 35,
                    "mcpOutput": 32,
                    "addressInput": 12,
                    "addressOutput": 13
                    
                    
                }
                
                
                
                
                ],
            "windows": [],
            "coolers": []
        },{
            "id": 9,
            "title": "piscine",
            "lamps": [{
                    "identifier": "1",
                    "description": "lamp 1",
                    "status": true,
                    "mcpInput": 35,
                    "mcpOutput": 33,
                    "addressInput": 7,
                    "addressOutput": 13
                } ,{
                    "identifier": "2",
                    "description": "piscine",
                    "status": true,
                    "mcpInput": 35,
                    "mcpOutput": 32,
                    "addressInput": 14,
                    "addressOutput": 8
                }
                ],
            "windows": [
            ],
            "coolers": []
        },
        {
            "id": 11,
            "title": "entre",
            "lamps": [
            {
                    "identifier": "1",
                    "description": "facade",
                    "status": true,
                    "mcpInput": 35,
                    "mcpOutput": 32,
                    "addressInput": 13,
                    "addressOutput": 10
                }
                ],
            "windows": [],
            "coolers": []
        }
    ]
};
