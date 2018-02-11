# SmartHouse

## Prérequis

### Installation des JCE (Java Cryptography Extensions)

Télécharger l'enxtension à cette adresse http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html


### Installation de l'environnement de développement Android

**update SDK Android**

android update sdk --no-ui --all

android update sdk -u --filter build-tools-19.1.0

### Compilation syslog-ng

 gperf \
    libevent-dev \
    liblua5.2-dev \
    libmongo-client-dev \
    libperl-dev \
    librdkafka-dev \
    libtokyocabinet-dev \
    libzmq3-dev \
    syslog-ng-dev

```
cd
apt-get update
apt-get -y install wget vim build-essential pkg-config flex bison autoconf-archive gir1.2-glib libgtk2.0-dev libssl-dev libjson-c-dev libjson-c3 syslog-ng-dev lua5.3 liblua50-dev gperf
wget --no-check https://github.com/balabit/syslog-ng/releases/download/syslog-ng-3.11.1/syslog-ng-3.11.1.tar.gz && tar -xvf syslog-ng-3.11.1.tar.gz
mkdir /syslog-ng && mkdir /syslog-ng-extensions
cd syslog-ng-3.11.1
./configure --prefix=/syslog-ng --enable-json --disable-smtp --disable-mongodb --disable-geoip --disable-redis --disable-riemann
make && make install
cd ..
wget --no-check https://github.com/balabit/syslog-ng-incubator/archive/syslog-ng-incubator-0.6.0.tar.gz && tar -xvf syslog-ng-incubator-0.6.0.tar.gz
cd syslog-ng-incubator-syslog-ng-incubator-0.6.0
export LD_LIBRARY_PATH=/syslog-ng/lib
autoreconf -i
export PKG_CONFIG_PATH=/usr/share/pkgconfig:/syslog-ng/lib/pkgconfig
./configure --prefix=/syslog-ng-extensions && make && make install
```