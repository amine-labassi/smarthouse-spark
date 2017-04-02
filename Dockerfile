# AlpineLinux with a glibc-2.23-r1, Oracle Java jdk8 and unlimited JCE policy patch
FROM anapsix/alpine-java:jdk8

MAINTAINER David Castellanos <davidcaste@gmail.com>

RUN mkdir -p /var/myapp

COPY target/smarthouse-spark-1.0-SNAPSHOT-jar-with-dependencies.jar

# do all in one step
RUN apk upgrade --update && \
    apk add --update curl unzip && \
    curl -jksSLH "Cookie: oraclelicense=accept-securebackup-cookie" -o /tmp/unlimited_jce_policy.zip "http://download.oracle.com/otn-pub/java/jce/8/jce_policy-8.zip" && \
    unzip -jo -d ${JAVA_HOME}/jre/lib/security /tmp/unlimited_jce_policy.zip && \
    apk del curl unzip && \
    rm -rf /tmp/* /var/cache/apk/*

