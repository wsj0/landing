# Generated by Django 2.1.5 on 2019-02-25 01:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0004_auto_20190225_0950'),
    ]

    operations = [
        migrations.RenameField(
            model_name='humitureinfo',
            old_name='hum',
            new_name='humi',
        ),
        migrations.RenameField(
            model_name='humitureinfo',
            old_name='tem',
            new_name='temp',
        ),
    ]