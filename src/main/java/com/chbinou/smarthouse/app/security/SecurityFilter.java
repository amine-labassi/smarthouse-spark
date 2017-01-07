package com.chbinou.smarthouse.app.security;

import spark.Filter;
import spark.Spark;

/**
 * Created by nxuser on 07/01/2017.
 */
public class SecurityFilter
{
    public static Filter ensureCallSecured()
    {
        return (request, response) ->
        {
            boolean authentificated = true;

            // check if secured call

            if(!authentificated)
            {
                Spark.halt(401,"Utilisateur non authentifié");
            }
        };
    }
}
