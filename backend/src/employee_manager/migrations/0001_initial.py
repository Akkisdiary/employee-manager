# Generated by Django 3.1.4 on 2020-12-30 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('first_name', models.CharField(blank=True, max_length=50)),
                ('last_name', models.CharField(blank=True, max_length=50)),
                ('address', models.CharField(blank=True, max_length=150)),
                ('dob', models.DateField(blank=True, null=True)),
                ('company', models.CharField(blank=True, max_length=100)),
                ('mobile', models.CharField(blank=True, max_length=10)),
                ('city', models.CharField(blank=True, max_length=50)),
            ],
        ),
    ]