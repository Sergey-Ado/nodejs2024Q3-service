FROM postgres:latest

RUN ["mkdir","/logs"]
RUN ["chown","postgres:postgres","/logs"]

CMD [ "postgres","-c","logging_collection=on","-c","log_directory=/logs" ]