# Generated by Django 2.1.5 on 2019-02-25 02:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0007_humitureinfo'),
    ]

    operations = [
        migrations.RenameField(
            model_name='humitureinfo',
            old_name='humi',
            new_name='hum',
        ),
        migrations.RenameField(
            model_name='humitureinfo',
            old_name='temp',
            new_name='tem',
        ),
    ]
