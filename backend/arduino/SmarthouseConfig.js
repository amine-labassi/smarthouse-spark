module.exports = {
    "arduinos": [
        {
            "ser": "75735303531351519160",
            "address": 0
        }
    ],
    "zones": [
        {
            "id": 1,
            "title": "sallon",
            "lamps": [
                
                {
                    "identifier": "0",
                    "id": 0,
                    "description": "salle a manger",
                    "status": true,
                    "arduino": 0
                },{
                    "identifier": "3",
                    "id": 1,
                    "description": "lamp 1",
                    "status": true,
                    "arduino": 0
                },
                
                {
                    "identifier": "5",
                    "id": 2,
                    "description": "lamp 2",
                    "status": true,
                    "arduino": 0
                },
                {
                    "identifier": "6",
                    "id": 3,
                    "description": "chambre",
                    "status": true,
                    "arduino": 0
                }
                
            ],
            "windows": [
                

                
                
                {
                    "identifier": "1",
                    "title": "Fenetre 1",
                    "id": 0,
                    "arduino": 0,
                    "upTime": 7280,
                    "downTime": 7000,
                    "pointer" : 0
                },
                {
                    "identifier": "2",
                    "title": "Fenetre 2",
                    "id": 1,
                    "arduino": 0,
                    "upTime": 7280,
                    "downTime": 7000,
                    "pointer" : 0
                },
                {
                    "identifier": "3",
                    "title": "Fenetre 3",
                    "arduino": 0,
                    "id": 2,
                    "upTime": 7280,
                    "downTime": 7000,
                    "pointer" : 0
                }
                

            ],
            "coolers": [
                {
                    "identifier": "1",
                    "id": 4,
                    "description": "clim1",
                    "status": true,
                    "arduino": 34,
                }
            ]
        },
        {
            "id": 2,
            "title": "Chambre parent",
            "lamps": [
            {
                    "identifier": "1",
                    "id": 5,
                    "description": "lamp1",
                    "status": true,
                    "arduino": 0
                },
                {
                    "identifier": "7",
                    "id": 6,
                    "description": "lamp 2",
                    "status": true,
                    "arduino": 35
                },{
                    "identifier": "3",
                    "id": 7,
                    "description": "lamp 3",
                    "status": true,
                    "arduino": 35
                }
                
                
            ],
            "windows": [
                {
                    "identifier": "1",
                    "title": "Fenetre lit",
                    "arduino": 0,
                    "upTime": 41670,
                    "downTime": 39120,
                    "pointer" : 0
                },
                {
                    "identifier": "2",
                    "title": "Fenetre picine",
                    "arduino": 0,
                    "upTime": 30000,
                    "downTime": 27500,
                    "pointer" : 0
                }

            ],
            "coolers": [
            {
                    "identifier": "1",
                    "id": 8,
                    "description": "clim",
                    "status": true,
                    "arduino": 0
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
                    "arduino": 0,
                    "upTime": 7280,
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
                    "arduino": 0,
                    "upTime": 7280,
                    "downTime": 7000,
                    "pointer" : 0
                }
            ],
            "coolers": [ {
                    "identifier": "1",
                "id": 9,
                    "description": "clim",
                    "status": true,
                    "arduino": 0,
                }]
        },
        {
            "id": 5,
            "title": "chambre bebe",
            "lamps": [{
                    "identifier": "2",
                    "id": 10,
                    "description": "lamp",
                    "status": true,
                    "arduino": 0,
                }
                ],
            "windows": [
               {
                    "identifier": "1",
                    "title": "CHAMBRE BEBE",
                    "arduino": 0,
                    "upTime": 15450,
                    "downTime": 15310,
                    "pointer" : 0

                }
            ],
            "coolers": [
                {
                    "identifier": "3",
                    "id": 11,
                    "description": "lamp 3",
                    "status": true,
                    "arduino": 35
                }
                ]
        },
        {
            "id": 6,
            "title": "Hall",
            "lamps": [
                {
                    "identifier": "7",
                    "id": 12,
                    "description": "lamp 7",
                    "status": true,
                    "arduino": 35
                },
                {
                    "identifier": "8",
                    "id": 13,
                    "description": "lamp 8",
                    "status": true,
                    "arduino": 35
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
                    "id": 14,
                    "description": "lamp 5",
                    "status": true,
                    "arduino": 0
                    
                    
                }
                
                
                
                
                ],
            "windows": [],
            "coolers": []
        },
        {
            "id": 9,
            "title": "piscine",
            "lamps": [{
                    "identifier": "1",
                    "id": 15,
                    "description": "lamp 1",
                    "status": true,
                    "arduino": 0
                } ,{
                    "identifier": "2",
                    "id": 16,
                    "description": "piscine",
                    "status": true,
                    "arduino": 0
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
                    "id": 17,
                    "description": "facade",
                    "status": true,
                    "arduino": 0
                }
                ],
            "windows": [],
            "coolers": []
        }
    ]
};
