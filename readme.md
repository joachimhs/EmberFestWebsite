# EmberFest Website

##Backend Development:

Install Java 1.7 and maven and build to backend: 

    mvn clean; mvn install
    

Go to ""backend/". 

Edit "backend/config.properties"" to suit your setup. 

Execute the JAR file: 

    java -jar target/emberfest-0.1.0-jar-with-dependencies.jar


##Frontend Development:

Build the frontend. Install Grut and NPM. Then install dependencies: 


    npm install


To build the Emberfest 

    grunt dist

In order for Grunt to watch your files and recompile whenever you make changes, simply run: 

    grunt


##Launch Website

* http://localhost:8081 (port defined in config.properties)