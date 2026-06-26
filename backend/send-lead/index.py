import json
import os
import smtplib
from email.mime.text import MIMEText
from email.header import Header


def handler(event: dict, context) -> dict:
    '''Принимает заявки с сайта (форма контактов и калькулятор) и отправляет их на почту компании.'''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': {**cors, 'Access-Control-Max-Age': '86400'}, 'body': ''}

    if method != 'POST':
        return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body') or '{}')

    name = str(body.get('name', '')).strip()
    phone = str(body.get('phone', '')).strip()
    email = str(body.get('email', '')).strip()
    message = str(body.get('message', '')).strip()
    source = str(body.get('source', 'Сайт')).strip()
    estimate = str(body.get('estimate', '')).strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Укажите имя и телефон'}, ensure_ascii=False),
        }

    smtp_host = os.environ.get('SMTP_HOST')
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    notify_email = os.environ.get('NOTIFY_EMAIL')

    if not all([smtp_host, smtp_user, smtp_password, notify_email]):
        return {
            'statusCode': 500,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Почта не настроена'}, ensure_ascii=False),
        }

    lines = [
        f'Новая заявка с сайта ЮНИТ-1',
        f'Источник: {source}',
        '',
        f'Имя: {name}',
        f'Телефон: {phone}',
    ]
    if email:
        lines.append(f'E-mail: {email}')
    if estimate:
        lines.append(f'Расчёт калькулятора: {estimate}')
    if message:
        lines.append(f'Сообщение: {message}')

    text = '\n'.join(lines)

    msg = MIMEText(text, 'plain', 'utf-8')
    msg['Subject'] = Header(f'Заявка с сайта — {name}', 'utf-8')
    msg['From'] = smtp_user
    msg['To'] = notify_email

    with smtplib.SMTP_SSL(smtp_host, 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, [notify_email], msg.as_string())

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'success': True}, ensure_ascii=False),
    }