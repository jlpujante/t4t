import logging
import json
from flask import Blueprint, Response

# from tracker.app import csrf

logger = logging.getLogger(__name__)

mod_api_backend = Blueprint('api', __name__, url_prefix='/api')


@mod_api_backend.route('/company/<companyid>', methods=['GET'])
def get_company(companyid):
    c = dict(id=0, name="TestCompany Sarl")
    return Response(
        response=json.dumps(c),
        status=200,
        mimetype="application/json"
    )


@mod_api_backend.route('/company/<companyid>/truck/all/position', methods=['GET'])
def get_company_truck_all_position(companyid):
    positions = list()
    positions.append(dict(id=0, type="truck", name='Trier', coordinates=[dict(lat='49.5874049', lng='6.1000373')]))
    positions.append(dict(id=1, type="truck", name='Cessange', coordinates=[dict(lat='49.5995129', lng='6.1474161')]))
    positions.append(dict(id=2, type="truck", name='Luxembourg', coordinates=[dict(lat='49.6110126', lng='6.158577')]))
    positions.append(dict(id=3, type="truck", name='Trier 2', coordinates=[dict(lat='49.5874049', lng='6.1000373')]))
    positions.append(dict(id=4, type="truck", name='Cessange 2', coordinates=[dict(lat='49.5995129', lng='6.1474161')]))
    positions.append(dict(id=5, type="truck", name='Luxembourg 2', coordinates=[dict(lat='49.6110126', lng='6.158577')]))
    positions.append(dict(id=6, type="truck", name='Trier 3', coordinates=[dict(lat='49.5874049', lng='6.1000373')]))
    positions.append(dict(id=7, type="truck", name='Cessange 3', coordinates=[dict(lat='49.5995129', lng='6.1474161')]))
    positions.append(dict(id=8, type="truck", name='Luxembourg 3', coordinates=[dict(lat='49.6110126', lng='6.158577')]))
    positions.append(dict(id=9, type="truck", name='Luxembourg 4', coordinates=[dict(lat='49.6110126', lng='6.158577')]))
    positions.append(dict(id=10, type="truck", name='Luxembourg 5', coordinates=[dict(lat='49.6110126', lng='6.158577')]))
    return Response(
        response=json.dumps(positions),
        status=200,
        mimetype="application/json"
    )


@mod_api_backend.route('/company/<companyid>/truck/<truckid>/checkpoints', methods=['GET'])
def get_company_truck_position(companyid, truckid):
    positions0 = list()
    positions0.append(dict(id=0, datetime='', lat='49.587341', lng='6.100561'))
    positions0.append(dict(id=0, datetime='', lat='49.587870', lng='6.102106'))
    positions0.append(dict(id=0, datetime='', lat='49.588538', lng='6.104477'))
    positions0.append(dict(id=0, datetime='', lat='49.589192', lng='6.106666'))
    positions0.append(dict(id=0, datetime='', lat='49.591631', lng='6.105520'))
    positions0.append(dict(id=0, datetime='', lat='49.595813', lng='6.114073'))
    positions0.append(dict(id=0, datetime='', lat='49.597555', lng='6.115001'))
    positions0.append(dict(id=0, datetime='', lat='49.598584', lng='6.117656'))
    positions0.append(dict(id=0, datetime='', lat='49.599500', lng='6.118509'))
    positions0.append(dict(id=0, datetime='', lat='49.600475', lng='6.119523'))

    positions1 = list()
    positions1.append(dict(id=1, datetime='', lat='49.587341', lng='6.100561'))
    positions1.append(dict(id=1, datetime='', lat='49.587870', lng='6.102106'))
    positions1.append(dict(id=1, datetime='', lat='49.588538', lng='6.104477'))
    positions1.append(dict(id=1, datetime='', lat='49.589192', lng='6.106666'))
    positions1.append(dict(id=1, datetime='', lat='49.591631', lng='6.105520'))
    positions1.append(dict(id=1, datetime='', lat='49.595813', lng='6.114073'))
    positions1.append(dict(id=1, datetime='', lat='49.595822', lng='6.117574'))
    positions1.append(dict(id=1, datetime='', lat='49.592108', lng='6.116780'))

    positions2 = list()
    positions2.append(dict(id=2, datetime='', lat='49.587341', lng='6.100561'))
    positions2.append(dict(id=2, datetime='', lat='49.587870', lng='6.102106'))
    positions2.append(dict(id=2, datetime='', lat='49.588538', lng='6.104477'))
    positions2.append(dict(id=2, datetime='', lat='49.589192', lng='6.106666'))
    positions2.append(dict(id=2, datetime='', lat='49.591631', lng='6.105520'))
    positions2.append(dict(id=2, datetime='', lat='49.595813', lng='6.114073'))
    positions2.append(dict(id=2, datetime='', lat='49.597555', lng='6.115001'))
    positions2.append(dict(id=2, datetime='', lat='49.597539', lng='6.117756'))
    positions2.append(dict(id=2, datetime='', lat='49.598958', lng='6.118207'))
    positions2.append(dict(id=2, datetime='', lat='49.599605', lng='6.118550'))
    positions2.append(dict(id=2, datetime='', lat='49.599918', lng='6.117949'))
    positions2.append(dict(id=2, datetime='', lat='49.600092', lng='6.109988'))

    positions = {'0': positions0,
                 '1': positions1,
                 '2': positions2,
                 '3': [dict(id=3, datetime='', lat='49.587341', lng='6.100561')],
                 '4': [dict(id=4, datetime='', lat='49.587341', lng='6.100561')],
                 '5': [dict(id=5, datetime='', lat='49.587341', lng='6.100561')],
                 '6': [dict(id=6, datetime='', lat='49.587341', lng='6.100561')],
                 '7': [dict(id=7, datetime='', lat='49.587341', lng='6.100561')],
                 '8': [dict(id=8, datetime='', lat='49.587341', lng='6.100561')],
                 '9': [dict(id=9, datetime='', lat='49.587341', lng='6.100561')],
                 '10': [dict(id=10, datetime='', lat='49.587341', lng='6.100561')]
                 }
    return Response(
        response=json.dumps(positions[truckid]),
        status=200,
        mimetype="application/json"
    )
