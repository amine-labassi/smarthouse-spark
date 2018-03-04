import threading, datetime
i=1
def job():
    print datetime.datetime.now()
    threading.Timer(10, job).start()
   

