package com.chbinou.smarthouse.app.config.security;

import com.google.common.base.Charsets;
import com.google.common.hash.Hashing;
import org.pac4j.core.context.Pac4jConstants;
import org.pac4j.core.context.WebContext;
import org.pac4j.core.credentials.authenticator.Authenticator;
import org.pac4j.core.exception.CredentialsException;
import org.pac4j.core.exception.HttpAction;
import org.pac4j.core.profile.CommonProfile;
import org.pac4j.core.util.CommonHelper;
import org.pac4j.core.credentials.UsernamePasswordCredentials;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.utils.IOUtils;

import java.io.IOException;

public class BasicAuthenticator implements Authenticator<UsernamePasswordCredentials>
{
    protected final Logger logger = LoggerFactory.getLogger(getClass());

    public static final String DEFAULT_PASSWORD = "e10adc3949ba59abbe56e057f20f883e";

    private String cryptedPassword = null;

    public BasicAuthenticator()
    {
        this.cryptedPassword = readCryptedPassword();
    }

    @Override
    public void validate(final UsernamePasswordCredentials credentials, final WebContext context) throws HttpAction, CredentialsException
    {
        if (credentials == null)
        {
            throwsException("No credential");
        }

        String username = credentials.getUsername();
        String password = credentials.getPassword();

        if (CommonHelper.isBlank(username))
        {
            throwsException("Username cannot be blank");
        }

        if (CommonHelper.areNotEquals(username, "smartHouseOwner"))
         {
              throwsException("Bad credentials");
         }

        if (CommonHelper.isBlank(password))
        {
            throwsException("Password cannot be blank");
        }

        String cryptedUserPassword = Hashing.sha256().hashString(password, Charsets.UTF_8).toString();

        if (CommonHelper.areNotEquals(cryptedUserPassword, cryptedPassword))
        {
            throwsException("Bad credentials");
        }

        final CommonProfile profile = new CommonProfile();
        profile.setId(username);
        profile.addAttribute(Pac4jConstants.USERNAME, username);
        credentials.setUserProfile(profile);
    }

    protected void throwsException(final String message) throws CredentialsException {
        throw new CredentialsException(message);
    }

    private String readCryptedPassword()
    {
        String cryptedPassword = System.getProperty("user.pwd");
        return cryptedPassword != null ? cryptedPassword : DEFAULT_PASSWORD;
    }
}
