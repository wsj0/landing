# Generated by Django 2.1.5 on 2019-02-28 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0018_delete_humitureinfo'),
    ]

    operations = [
        migrations.CreateModel(
            name='HumitureInfo',
            fields=[
                ('sn', models.IntegerField(primary_key=True, serialize=False)),
                ('alias', models.CharField(max_length=20)),
                ('date', models.DateTimeField(auto_now=True)),
                ('tem', models.IntegerField(null=True)),
                ('hum', models.IntegerField(null=True)),
            ],
        ),
    ]