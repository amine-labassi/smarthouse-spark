package com.chbinou.smarthouse.app.exception;

import org.pac4j.core.exception.TechnicalException;

/**
 * Created by nxuser on 19/02/2017.
 */
public class SecurityGrantedAccessException extends TechnicalException
{
    public SecurityGrantedAccessException()
    {
        super("access granted");
    }
}
