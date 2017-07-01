package com.chbinou.smarthouse.app.config.security;

import org.pac4j.core.authorization.authorizer.RequireAnyRoleAuthorizer;
import org.pac4j.core.client.Clients;
import org.pac4j.core.config.Config;
import org.pac4j.core.config.ConfigFactory;
import org.pac4j.core.context.HttpConstants;
import org.pac4j.core.matching.ExcludedPathMatcher;
import org.pac4j.core.matching.HttpMethodMatcher;
import org.pac4j.http.client.direct.DirectFormClient;
import org.pac4j.http.client.direct.HeaderClient;
import org.pac4j.http.credentials.authenticator.test.SimpleTestUsernamePasswordAuthenticator;
import org.pac4j.jwt.config.encryption.SecretEncryptionConfiguration;
import org.pac4j.jwt.config.signature.SecretSignatureConfiguration;
import org.pac4j.jwt.credentials.authenticator.JwtAuthenticator;

/**
 * Created by nxuser on 18/02/2017.
 */
public class SmartHouseSecurityConfigFactory implements ConfigFactory
{

    public final static String KEY1 = "JaNdRgUkXp2s5v8y/B?E(H+MbPeShVmY";
    public final static String KEY2 = "z$C&F)H@McQfTjWnZr4u7x!A%D*G-KaP";

    @Override
    public Config build(Object... objects)
    {
        DirectFormClient directFormClient = new DirectFormClient(new SimpleTestUsernamePasswordAuthenticator());

        JwtAuthenticator jwtAuthenticator = new JwtAuthenticator();
        jwtAuthenticator.setSignatureConfiguration(new SecretSignatureConfiguration(KEY1));
        jwtAuthenticator.setEncryptionConfiguration(new SecretEncryptionConfiguration(KEY2));

        HeaderClient headerClient = new HeaderClient("Authorization", "Bearer ", jwtAuthenticator);

        Clients clients = new Clients(directFormClient, headerClient);

        Config config = new Config(clients);

        config.addAuthorizer("admin", new RequireAnyRoleAuthorizer("ROLE_SMARTHOUSE_ADMIN"));
        config.addAuthorizer("user", new RequireAnyRoleAuthorizer("ROLE_SMARTHOUSE_USER"));

        config.addMatcher("excludedPublicResources", new ExcludedPathMatcher("^/public/*$"));
        config.addMatcher("securedHttpMethod", new HttpMethodMatcher(HttpConstants.HTTP_METHOD.GET, HttpConstants.HTTP_METHOD.POST));

        config.setHttpActionAdapter(new DefaultHttpActionAdapter());

        return config;
    }
}
