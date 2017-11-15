FROM resin/raspberrypi3-python:3.5.4-slim
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN pip install -r requirements.txt
CMD python app.py
