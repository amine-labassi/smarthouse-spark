ANY                              = "/*";
API_PUSH_WSOCKET                 = "/push";
PATH_API                         = "/api";

LOGIN                            = "/login"
#Lamps
PATH_SWITCHING                   = "/switching"
PATH_LAMP                        = "/lamp"
API_STATUS_LAMP_ALL              = "/api/switching/lamp/all/status"
API_SWITCHON_LAMP                = "/api/switching/lamp/<identifierzone>/<identifier>/on"
API_SWITCHOFF_LAMP               = "/api/switching/lamp/<identifierzone>/<identifier>/off"
API_SWITCHON_LAMP_ALL            = "/api/switching/lamp/all/on"
API_SWITCHOFF_LAMP_ALL           = "/api/switching/lamp/all/off"
#climatiseurs
PATH_COOLER                      = "/api/switching/climatiseur"
API_SWITCHON_CLIMATISEUR         = "/api/switching/climatiseur/<identifierzone>/<identifier>/on"
API_SWITCHOFF_CLIMATISEUR        = "/api/switching/climatiseur/<identifierzone>/<identifier>/off"
API_SWITCHON_CLIMATISEUR_ALL     = "/api/switching/climatiseur/all/on"
API_SWITCHOFF_CLIMATISEUR_ALL    = "/api/switching/climatiseur/all/off"

#Windows
PATH_WINDOW                      = "/api/switching/window"
API_SWITCHUP_WINDOW              = "/api/switching/window/<identifierzone>/<identifier>/up";
API_SWITCHDOWN_WINDOW            = "/api/switching/window/<identifierzone>/<identifier>/down";
API_SWITCHUP_WINDOW_ALL          = "/api/switching/window/all/up"
API_SWITCHDOWN_WINDOW_ALL        = "/api/switching/window/all/down"
API_POSITION_WINDOW              = "/api/switching/window/<identifierzone>/<identifier>/<pos>";
API_POSITION_WINDOW_ALL          = "/all/<pos>"

