import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Приём заявки на ремонт и сохранение в БД. v2"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    service = body.get('service', '').strip()
    breakdown = body.get('breakdown', '').strip()
    comment = body.get('comment', '').strip()

    if not name or not phone or not service:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'Заполните имя, телефон и тип техники'},
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO t_p69549265_home_appliance_repai.orders (name, phone, service, breakdown, comment) VALUES (%s, %s, %s, %s, %s) RETURNING id",
        (name, phone, service, breakdown, comment),
    )
    order_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {'success': True, 'order_id': order_id},
    }