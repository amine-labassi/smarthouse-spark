from distutils.core import setup

setup(
    # Application name:
    name="Smarthouse",

    # Version number (initial):
    version="1.0.0",

    # Application author details:
    author="Yassin CHBINOU",
    author_email="name@addr.ess",

    # Packages
    packages=["api",
    "api.config",
    "api.config.environment",
    "api.config.websocket",
    "api.config.security",
    "api.config.test",
    "api.electronic.model"
    ],

    # Include additional files into the package
    include_package_data=True,

    # Details
    url="http://pypi.python.org/pypi/MyApplication_v010/",

    #
    # license="LICENSE.txt",
    description="Useful towel-related stuff.",

    # long_description=open("README.txt").read(),

    # Dependent packages (distributions)
    install_requires=[
        "flask",
        "flask-socketio",
        "smbus"
    ],
)
