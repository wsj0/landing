# Generated by Django 2.1.5 on 2019-02-28 07:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0013_deviceinfo'),
    ]

    operations = [
        migrations.RenameField(
            model_name='deviceinfo',
            old_name='id',
            new_name='sn',
        ),
        migrations.RenameField(
            model_name='version',
            old_name='id',
            new_name='sn',
        ),
    ]