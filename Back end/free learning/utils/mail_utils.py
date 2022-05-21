from datetime import datetime
import smtplib

from exception.http_exception import UnprocessableEntityException


def send_mail( 
    sender='freelearningvn@gmail.com',
    password='free123!@#', 
    receiver=None, 
    subject=None, 
    message=None
):
    email_text = f'Subject: {subject}\n\n{message}\n\n{datetime.utcnow()}'
    try: 
        smtp_server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        smtp_server.ehlo()
        smtp_server.login(sender, password)
        smtp_server.sendmail(sender, receiver, email_text)
        smtp_server.close()
        return "Email sent successfully!"
    except Exception as ex: 
        raise UnprocessableEntityException("Email not found")
