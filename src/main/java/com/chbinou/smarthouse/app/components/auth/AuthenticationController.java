package com.chbinou.smarthouse.app.components.auth;

import com.chbinou.smarthouse.app.config.security.SmartHouseSecurityConfigFactory;
import org.pac4j.core.profile.UserProfile;
import org.pac4j.core.profile.jwt.JwtClaims;
import org.pac4j.jwt.config.encryption.SecretEncryptionConfiguration;
import org.pac4j.jwt.config.signature.SecretSignatureConfiguration;
import org.pac4j.jwt.profile.JwtGenerator;
import org.pac4j.jwt.profile.JwtProfile;
import spark.Route;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

import static spark.Spark.halt;

/**
 * Created by nxuser on 19/02/2017.
 */
public class AuthenticationController
{
    public static JwtGenerator<JwtProfile> jwtGenerator = new JwtGenerator<JwtProfile>();

    static
    {
        jwtGenerator.setSignatureConfiguration(new SecretSignatureConfiguration(SmartHouseSecurityConfigFactory.KEY1));
        jwtGenerator.setEncryptionConfiguration(new SecretEncryptionConfiguration(SmartHouseSecurityConfigFactory.KEY2));
    }

    public static Route login = (request, response) ->
    {
        response.header("Content-Type","application/json");

        JwtProfile jwtProfile = new JwtProfile();
        jwtProfile.setId("smartHouseOwner");
        jwtProfile.setClientName("smartHouseOwner");

        LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC);

        ((UserProfile)jwtProfile).addAttribute(JwtClaims.ISSUER, "Chbinou.Yassin");
        //((UserProfile)jwtProfile).addAttribute(JwtClaims.SUBJECT, "smartHouse.Owner");
        ((UserProfile)jwtProfile).addAttribute(JwtClaims.ISSUED_AT, Date.from(now.toInstant(ZoneOffset.UTC)));
        ((UserProfile)jwtProfile).addAttribute(JwtClaims.EXPIRATION_TIME, Date.from(now.plusMinutes(10).toInstant(ZoneOffset.UTC)));

        return jwtGenerator.generate(jwtProfile);
    };
}
