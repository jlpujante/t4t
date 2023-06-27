import sys
import argparse
import os
from main import application
from tracker import app

if __name__ == '__main__':
    def start_server(argv):
        clParser = argparse.ArgumentParser(description='Traker')
        clParser.add_argument('--host', default='0.0.0.0')
        clParser.add_argument('--port', default=9999, type=int)
        clParser.add_argument('--debug', action='store_true')
        args = clParser.parse_args()
        app.DISABLE_CACHE = args.debug
        if os.path.exists("./server.crt") and os.path.exists("./server.key"):
            # from OpenSSL import SSL
            #  context = SSL.Context(SSL.SSLv23_METHOD)
            context = ('./server.crt', './server.key')
            application.run(host=args.host, port=args.port, debug=args.debug, ssl_context=context, threaded=True)
        else:
            application.run(host=args.host, port=args.port, debug=args.debug, threaded=True)


    start_server(sys.argv)
